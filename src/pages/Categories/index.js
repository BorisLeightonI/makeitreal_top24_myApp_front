import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import ModalEdit from "../../components/ModalEdit";
import './index.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitFlag, setSubmitFlag] = useState('');
  const [modal, setModal] = useState(false);
  const [cat, setCat] = useState({});

  useEffect(()=>{
    axios.get('http://localhost:8080/api/categories')
        .then(res => {
          setLoading(true);
          console.log('res.data:',res.data);
          setCategories(res.data.data);
        })
        .catch(err => console.error(err))
        .finally(()=>{
          setLoading(false)
        })
  },[submitFlag])

  const handleClick = (e) => {
    e.preventDefault();
    console.log('form input data', e.target)
    console.dir(e.target[0].value);

    axios.post('http://localhost:8080/api/categories', {name: e.target[0].value})
      .then(res => {
        console.log(res);
        setSubmitFlag(res.data.data._id);
      })
      .catch(err => console.error(err))
  }
  const handleModal = () => {
    setModal(modal => !modal);
  }
  return ( <div>
    <h1>Ingrese una nueva Categoría</h1>
    <Container>
      <Row>
        <Col>
          <form onSubmit={handleClick}>
            <label htmlFor="in">Category</label>
              <input className="form-control" id="in" name="category" placeholder="input a category"/>
            <button className="btn btn-primary">Submit</button>
          </form>
        </Col>
        <Col sm>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>N°</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading?<p>Loading...</p>:categories.map((cat,index) => 
              <tr>
                <td>{1+index}</td>
                <td>{cat.name}</td>
                <td>
                  <Button onClick={()=>{handleModal(); setCat(cat)}} variant="outline-primary">Edit</Button>
                  <Button variant="outline-warning">Delete</Button>
                </td>
              </tr>)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    {modal?<ModalEdit flagState={true} handleModal={handleModal} category = {cat} setFlag={setSubmitFlag}/>:null}
  </div> );
}

export default Categories;

