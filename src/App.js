import Swal from 'sweetalert2';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Hasil, ListCategories, NavbarComponent } from './Components';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3 container-fluid">
        <Row>
          <ListCategories/>
          <Col>
            <h4>Daftar Produk</h4>
            <hr/>
          </Col>
          <Hasil/>
        </Row>
      </div>
    </div>
  );
}

export default App;
