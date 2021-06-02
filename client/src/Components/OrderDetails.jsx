import React from 'react'

import Navbar from "./Navbar";
import Header from "./Header";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Orders from "./Orders";
import OrderDet from "./OrderDet";
import "../App.css";
import "../index.css";
import { Link, useHistory } from "react-router-dom";

function YourCart() {
  const history=useHistory();
  
    return (    
        <>
          <Navbar />
          <OrderDet />
        </>
    )
    }
export default YourCart
