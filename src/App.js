import axios from 'axios';
import {API_URL} from "./utils/const.js"
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menu, NavbarComponent } from './Components';
import React, { Component } from 'react'
import Swal from 'sweetalert2'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      menus: [],
      pilihKategori : 'Makanan',
      keranjangs : []
    }
  }
  async componentDidMount() {
    try {
      const menusResponse = await axios.get(API_URL + 'products?category.nama='+this.state.pilihKategori);

      this.setState({
        menus: menusResponse.data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  changeCategory = (value) => {
    this.setState({
      pilihKategori : value,
      menus:[]  //bisa dihapus
    })
    axios
      .get(API_URL+"products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({menus});
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  }
  masukKeranjang = (value) => {

    //cek pesanan yg sama apakah ada
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if(res.data.length === 0){
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          };
          //maka  masukan kekeranjang
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              Swal.fire({
                title: "Berhasil Ditambahkan",
                text: "Berhasil Ditambahkan" +keranjang.product.nama,
                imageUrl: "assets/images/"+keranjang.product.category.nama.toLowerCase()+"/"+keranjang.product.gambar,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
            })
          .catch((error)=> {
            console.log("Error:", error);
          })
        }else{
          console.log("produknya ada update saja");
          // jika produk yg sama ada lakukan update
          const keranjang = {
            jumlah: res.data[0] + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          };

          axios
            .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              Swal.fire({
                title: "Berhasil Ditambahkan",
                text: "Berhasil Ditambahkan" +keranjang.product.nama,
                imageUrl: "assets/images/"+keranjang.product.category.nama.toLowerCase()+"/"+keranjang.product.gambar,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
            })
          .catch((error)=> {
            console.log("Error:", error);
          })
        }
      })
  }
  render() {
    const {menus, pilihKategori} = this.state;
    return (
      <div className="App">
        <NavbarComponent />
          <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                pilihKategori={pilihKategori}
              />
              <Col>
                <h4>Daftar Produk</h4>
                <hr/>
                <Row>
                {menus && menus.map((menu) => (
                  <Menu 
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
                </Row>
              </Col>
              <Hasil/>
            </Row>
          </Container>
          </div>
      </div>
    )
  }
}
