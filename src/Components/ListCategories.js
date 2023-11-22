import React, { Component } from 'react'
import axios from 'axios';
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama}) => {
  if(nama === 'Makanan') return <FontAwesomeIcon icon={faUtensils} className="mb-1" />
  if(nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} className="mb-1" />
  if(nama === 'Cemilan') return <FontAwesomeIcon icon={faCheese} className="mb-1" />

  return <FontAwesomeIcon icon={faCheese} className='mr-2' />
}
export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories : []
    }
  }
  async componentDidMount(){
    try {
      const categoriesResponse = await axios.get(API_URL + 'categories');
      this.setState({
        categories : categoriesResponse.data
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  render() {
    const {categories} =  this.state
    return (
        <Col ms={2} mt={2}>
            <h4> Daftar Kategori</h4>
            <hr/>
            <ListGroup>
              {categories && categories.map((category) => (
                <ListGroup.Item key={category.id}>
                  <Icon nama={category.nama}/>
                  <h5>{category.nama}</h5>
                </ListGroup.Item>
              ))}
            </ListGroup>
        </Col>
    )
  }
}
