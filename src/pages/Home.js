import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./Products";


function Home() {
  const {user, isAuthenticated} = useAuth0();
  const [loadCat, setLoadCat] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('undefined');
  const [numRender, setNumRender] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/categories')
        .then(res => setCategories(res.data.data))
        .catch(err => console.error(err))
        .finally(()=>setLoadCat(false))
  },[])




  const handleSelect = (e) => {
    const { value } = e.target;
    setCategory(value);
  }
  return ( <div>
    <h1>Home</h1>
    {(isAuthenticated||localStorage.getItem('token'))&&user&&<h3>Bienvenido {user.name}</h3>}
    <h5>Selecciona productos por categoría</h5>
    {loadCat?<p>Loading...</p>
            :<select className="form-select" onChange={handleSelect} name='categories' >
              <option value='undefined'>--Select--</option>
              {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
            </select>
          }
    {category&&<Products category={category}/>}
  </div> );
}

export default Home;