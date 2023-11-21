import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {numberWithCommas} from '../utils/numberFormat.js'

const Menu = ({menu}) => {
  return (
    <Col lg={6} xs={6} className="mb-3 mr-3">
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
            <Card.Body>
            <Card.Title>{menu.nama}</Card.Title>
            <Card.Text>
                Rp. {numberWithCommas(menu.harga)}
                
            </Card.Text>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Menu