import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Blog from './pages/Blog'
import CategoryItems from './pages/CategoryItems'
import Footer from './Components/Footer'
import Login from './pages/Login'

const App = () => {
  return (
    <>
    <Navbar/>
    <section className='mt-5'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/categories' element={ <Categories/> } />
        <Route path='/blog' element={ <Blog /> } />
        <Route path='/categories/:name' element={ <CategoryItems/> } />
        <Route path='/login' element={ <Login/> } />
      </Routes>
    </section>
    <Footer/>
    </>
  )
}

export default App