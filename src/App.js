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
      menus: [],
      categories: []
    }
  }
  async componentDidMount() {
    try {
      const menusResponse = await axios.get(API_URL + 'products');
      const categoriesResponse = await axios.get(API_URL + 'categories');

      this.setState({
        menus: menusResponse.data,
        categories: categoriesResponse.data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
