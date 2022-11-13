import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CardComp from "../../components/Card";
import './index.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Products({category}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/products/all?category=${category}`)
        .then(res => setProducts(res.data.data))
        .catch(err => console.error('desde productos page:', err))
        .finally(()=>setLoading(false))
  },[category])
  const handleClick = (e)=>{
    e.preventDefault()
    console.log('desde product', e.target.name)
    setCartProducts(cart => [...cart, e.target.name])
    toast.success('Product added to Cart', {autoClose:2000})
  }
  const handleCart = (e) => {
    e.preventDefault();
    console.log(cartProducts);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    navigate('/cart');
  }
  return <div className="">
    {cartProducts&&<button onClick={handleCart}>Cart</button>}
    <ToastContainer/>
  <Container className="products-container">
    {!loading&&
      products.map(prod => 
        <CardComp key={prod._id} 
          id = {prod._id}
          title={prod.name} 
          body={prod.description} 
          img={prod.mediaResources[1]}
          btnText = {'add'}
          clickExterno={handleClick}
        />)}
  </Container>

  </div>
}

export default Products;