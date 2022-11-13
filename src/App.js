import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Login from './pages/Login'
import Categories from './pages/Categories';
import CreateProduct from './pages/CreateProduct';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';

function App() {
  return (<>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/create-products" element={<CreateProduct />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>);
}

export default App;
