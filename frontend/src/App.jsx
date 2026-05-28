
import {Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import Cart from './pages/cart'
import Header from './component/header'
import Login from './pages/login'
import Category from './pages/category'
import './App.css'
import CategoryCard from './pages/singlecategory'
import ProtectedRoute from './component/protectionTile/protection'

function App() {
  

  return (

    <>

    <Header/>

    <Routes>
      <Route exact path='/' element={<Home/> }/>
      <Route  path='/category' element={<Category/>}/>
      <Route path='/cart' element={<ProtectedRoute> <Cart/> </ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/singlecategory/:slug' element={<CategoryCard/>}/>
    </Routes>


     </>)
}
export default App
