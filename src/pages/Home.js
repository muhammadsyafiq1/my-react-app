import axios from 'axios';
import {API_URL} from "../utils/const.js"
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menu } from '../Components';
import React, { Component } from 'react'
import Swal from 'sweetalert2'

export default class Home extends Component {
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
      const keranjangResponse = await axios.get(API_URL + 'keranjangs');

      this.setState({
        menus: menusResponse.data,
        keranjangs: keranjangResponse.data,
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   async componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      try {
        const keranjangResponse = await axios.get(API_URL + 'keranjangs');
  
        this.setState({
          keranjangs: keranjangResponse.data,
        });
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
    const { id, harga, nama, category, gambar } = value;
  
    axios.get(API_URL + "keranjangs?product.id=" + id)
      .then((res) => {
        const keranjang = {
          jumlah: res.data.length === 0 ? 1 : res.data[0].jumlah + 1,
          total_harga: res.data.length === 0 ? harga : res.data[0].total_harga + harga,
          product: value
        };
  
        const request = res.data.length === 0 ?
        // jika saat get data pesanan tidak ada maka tambah pesanna
          axios.post(API_URL + "keranjangs", keranjang) :
        // jika pesanan sudah ada maka update total dan jumlah pesanan
          axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang);
  
        request.then(() => {
          Swal.fire({
            title: "Berhasil Ditambahkan",
            text: "Berhasil Ditambahkan" + nama,
            imageUrl: `assets/images/${category.nama.toLowerCase()}/${gambar}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
        }).catch((error) => {
          console.log("Error:", error);
        });
      });
  }
  
  render() {
    const {menus, pilihKategori, keranjangs} = this.state;
    return (
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
              <Hasil
                keranjangs={keranjangs}
              />
            </Row>
          </Container>
        </div>
    )
  }
}
