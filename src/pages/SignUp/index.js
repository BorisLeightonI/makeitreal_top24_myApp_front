import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const { user, isAuthenticated, logout, loginWithPopup, isLoading } = useAuth0();
  const [localUser, setLocalUser] = useState({name:'', email:'', password:'', provider:'local'})
  const isFirstRender = useRef(true);
  const [firstRender, setFirstRender] = useState(true);
  const navigate = useNavigate()

  useEffect(()=>{
    if (isFirstRender.current){
      isFirstRender.current = false
      console.warn('first render')
      return  // 👈️ return early if initial render
    }
    if(firstRender){
      console.warn('first render');
      setFirstRender(false);
      return; // 👈️ Este funciona
    }

    console.log('Auth0User updated');
    console.info(user, isLoading, isAuthenticated);
    if(user&&isLoading!=true) {
      toast.success('Loged in successfully', {autoClose:3000})
      const auth0User = {name: user.name, email:user.email, password:user.password, provider: 'auth0'}
      axios.post('http://localhost:8080/auth0/signup', auth0User)
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.data.token);
          toast.success('Signup response successfully', {autoClose:3500})
          toast.success('Token saved successfully', {autoClose:4000})
        })
        .catch(err => {
          console.error(err)
          toast.error('Signup response with bad request', {autoClose:5000})
        })
        .finally(()=>{
          const timer = setTimeout(()=>{
            navigate('/')
            return clearTimeout(timer);
          },5000)
        })
    }
  },[user])


  const handleChange = (e) => {
    const {name, value} = e.target;
    setLocalUser(localUser => ({...localUser, [name]:value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/local/', localUser)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.data.token);
      toast.success('Signup response successfully', {autoClose:3500})
      toast.success('Token saved successfully', {autoClose:4000})
    })
    .catch(err => {
      console.error(err)
      toast.error('Signup response with bad request', {autoClose:5000})
    })
    .finally(()=>{
      const timer = setTimeout(()=>{
        navigate('/')
        return clearTimeout(timer);
      },5000)
    })
  }
  const handleAuth0 = (e) => {
    if(!user){
    switch (e.target.name) {
      case 'google':
        loginWithPopup({connection: 'google-oauth2'})
        console.warn('Luego de loginwithpopup');
        break;
      case 'facebook':
      loginWithPopup({connection: 'facebook'})
        break;

      default:
        break;
    }
  }else{
    toast.warning('User already signed in', {autoClose:5000})
  }
  }
  return ( 
    <div>
      <h1>Sign Up</h1>
      <div className="contain" style={{margin:'20px'}}>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={handleChange}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={handleChange}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={handleChange}/>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label disabled" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button className="btn btn-primary ml-3">Submit</button>
          </form>
          <div style={{display:'flex'}}>
            <button className="btn btn-outline-primary mt-3" name="google" onClick={handleAuth0}>Google</button>
            <button className="btn btn-outline-primary ml-3 mt-3 disabled" name="facebook" onClick={handleAuth0}>Facebook</button>
          </div>
      
        </div>
    </div> );
}

export default SignUp;