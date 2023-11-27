import React, { Component } from 'react'
import { Col, ListGroup, Row ,Card, Badge} from 'react-bootstrap'
import {numberWithCommas} from '../utils/numberFormat.js'
import TotalBayar from '../Components/TotalBayar.js'

export default class  extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="">
        <h4>Daftar Produk</h4>
        <hr/>
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
        <TotalBayar  keranjangs={keranjangs}/>
      </Col>
    );
  }
}
