import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   

function CreateProduct() {
  const [product, setProduct] = useState({name: '', description:'', Categories: [], mediaResources: []})
  const [loading, setLoading] = useState(true);
  const [Categories, setCategories] = useState([]);
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  const isFirstRender = useRef(true);
  const [message, setMessage] = useState(false);
  
  useEffect(()=>{
    axios.get('http://localhost:8080/api/categories')
        .then(res => setCategories(res.data.data))
        .catch(err => console.error(err))
        .finally(()=>setLoading(false))
  },[])

  useEffect(()=>{
    if (isFirstRender.current){
      isFirstRender.current = false
      console.warn('first render')
      return ()=>console.warn('useEffect return invoked') // 👈️ return early if initial render
    }

    console.log('setFile fired');
    console.dir('file:',file);
    if(file) {handleSubmitFile();}
  },[file])

  const notify = ()=>{
    // Set to 10sec
    toast.warning('Danger', {autoClose:10000})
    // Set to 3sec
    toast.success('successful', {autoClose:3000})
    // User have to close it
    toast.info('GeeksForGeeks', {autoClose:false})
    toast.error('Runtime error', {
     // Set to 15sec
     position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
    toast('Hello Geeks')// Default
      
}

  const handleFile = (e) => {
    // console.log(e.target);
    // console.dir(e.target);
    // console.log(e.target.files[0]);
    
    readFile(e.target.files[0]); //no funciona más de una imágen
    setFile(e.target.files);
  }
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // console.log(e.target.result)
      setImages(e.target.result)
    }
    reader.onabort = (e) => {
      console.error(e)
      return
    }
    reader.onerror = (e) => {
      console.error(e);
      return;
    }
    reader.readAsDataURL(file)
  }
  const handleSubmitFile = () => {
    const data = new FormData()
    // data.append('username', username);
    for (let i = 0; i < file.length; i++) {
      data.append(`file_${i}`, file[i], file[i].name);
    }

    axios.post('http://localhost:8080/api/media/', data, 
      {
        headers: {'Content-Type': 'multipart/form-data'}
      })
    .then(res => {
      console.log('response send files:', res);
      toast.success('successfull response from Cloudinary', {autoClose:3000})
      setProduct({...product, 'mediaResources': Array.from(Object.values(res.data)) })
    })
    .catch(err => {
      console.error(err)
      toast.error('Something went wrong', {
        position: toast.POSITION.BOTTOM_LEFT, 
        autoClose:5000})
    })
    .finally(()=>{
      console.table('finally product updated', product)
      toast.info('Product succesfully updated, ready to continue filling the form ', {autoClose:5000})
    })
    // setProduct(product => ({...product, mediaResources: [...res?.data] }))
    //No actualiza el product->mediaResources
    console.table('product after promise:', product);

    // const prodRes = await axios.post('http://localhost:8080/api/products', product);
    // const prodRes = await axios.post('http://localhost:8080/api/products', {...product, mediaResources: Array.from(Object.values(res.data)) });
    // console.log('respuesta product controller', prodRes);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(product);
    handleProductLog();
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(value);
    setProduct(product => ({...product, [name]: value}))
  }
  const handleSelect = (e) => {
    const { name } = e.target;
    let values = Array.from(e.target.selectedOptions, (option)=>option.value)
    console.log('selected', values);
    setProduct(product => ({...product, [name]: values}))
  }
  const handleProductLog = async(e) => {
    // e.preventDefault();
    console.info('product:', product)
    const prodRes = await axios.post('http://localhost:8080/api/products', product);
    console.log('respuesta product controller', prodRes);
    toast.success('Product created successfully ', {autoClose:5000})
    const timer = setTimeout(()=>{
      setMessage('Producto creado');
      return ()=>{
        setMessage('');
        clearTimeout(timer)
      };
    },1000)
  }
  return <>
  <h1>Creación de producto</h1>
  <ToastContainer />
  <Container>
    <Row>
      <Col sm>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Imágen</label>
          <input type='file' name="file" className="form-control" onChange={handleFile}  accept="image/*" multiple/>
          <label className="form-label">Título</label>
          <input className="form-control" name="name" onChange={handleChange}/>
          <label className="form-label">Descripción</label>
          <input className="form-control" name="description" onChange={handleChange}/>
          <label className="form-label">Categorías</label>
          {loading?<p>Loading...</p>
            :<select className="form-select" onChange={handleSelect} name='Categories' multiple>
              {Categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
            </select>
          }
          <button className="btn btn-primary mt-3">Create</button>
        </form>
      </Col>
      <Col sm>
        {message&& <p>{message}</p>}
        Aquí va una card de previsualización
        {images&&<img src={images} alt='product' width={300}/>}
      </Col>
    </Row>
  </Container>
  </>;
}

export default CreateProduct;