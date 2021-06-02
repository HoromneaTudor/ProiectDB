import React from 'react'

import Navbar from "./Navbar";
import Header from "./Header";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import "../App.css";
import "../index.css";

function ShowAllProducts() {
    return (    
        <>
          <Navbar />
          <Products />
        </>
    )
    }
export default ShowAllProducts
