import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import './index.css';

function Nav() {
  const { user, isAuthenticated, logout, isLoading } = useAuth0();
  if(isLoading) return <div>Loading...</div>
  return ( <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: '#e3f2fd'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">E-Commerce</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/about'>About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/login'>Log In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/signup'>Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/create-products'>Crear Productos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/products'>Listar Productos</Link>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      {isAuthenticated&&user&&
        <div className="nav-item dropdown ml-3 user-div">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={user.picture} alt='user' loading="lazy" className="img-thumbnail rounded-circle " style={{width:'50px'}} />
          </a>
          <ul className="dropdown-menu user-dropdown" aria-labelledby="userDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
            <li className="dropdown-item" onClick={()=>logout()}>Log out</li>
          </ul>
        </div>
      }
    </div>
  </div>
</nav>




  </div> );
}

export default Nav;