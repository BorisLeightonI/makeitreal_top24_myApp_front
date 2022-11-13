import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardComp from "../../components/Card";

function Cart() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const cart = localStorage.getItem('cart')
  useEffect(()=>{
    axios.post('http://localhost:8080/api/products/cart', {cart})
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err))
      .finally(()=>setLoading(false))
  },[])
  const handleClick = (e)=>{
    e.preventDefault()
    toast.warn('Nothing to do', {autoClose:3000})
  }
  return <>
    <h1>Cart</h1>
    <h3>Por el momento es el fin del flujo</h3>
    <ToastContainer/>
    <Container className="products-container">
    {!loading&&
      products.map(prod => 
        <CardComp key={prod._id} 
          id = {prod._id}
          title={prod.name} 
          body={prod.description} 
          img={prod.mediaResources[1]}
          btnText = {'pay'}
          clickExterno={handleClick}
        />)}
    </Container>
  </> ;
}

export default Cart;