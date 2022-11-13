import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import './index.css';

function Login() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [localUser, setLocalUser] = useState({name:'', email:'', password:''})
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLocalUser(localUser => ({...localUser, [name]:value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(localUser);
  }
  return ( 
  <div className="container">
    <h1>Login</h1>
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
      <button className="btn btn-outline-primary ml-3" onClick={()=>loginWithRedirect({connection: 'google-oauth2'})}>Google</button>  
      <button className="btn btn-outline-primary ml-3" onClick={()=>loginWithRedirect({connection: 'facebook'})}>Facebook</button>  
    </form>

  </div> );
}

export default Login;