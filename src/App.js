import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL} from "./utils/const.js"
import { Col, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menu, NavbarComponent } from './Components';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: []
    }
  }
  componentDidMount(){
    axios
      .get(API_URL+"products")
      .then(res => {
        const menus = res.data;
        this.setState({menus});
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    const {menus} = this.state
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3 container-fluid">
          <Row>
            <ListCategories/>
            <Col>
              <h4>Daftar Produk</h4>
              <hr/>
              <Row>
              {menus && menus.map((menu) => (
                <Menu 
                  key={menu.id}
                  menu={menu}
                />
              ))}
              </Row>
            </Col>
            <Hasil/>
          </Row>
        </div>
      </div>
    )
  }
}
