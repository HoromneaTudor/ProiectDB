
import Navbar from "./Navbar";
import Header from "./Header";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import "../App.css";
import "../index.css";
import React, { useState, useEffect } from "react";
//import SignUp from "./Components/SignUp";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
//import Dashboard from "./Components/Dashboard";
//import Login from "./Components/Login";
//import home from "./Components/home";
// import Navbar from "./Components/Navbar";
// import Header from "./Components/Header";
// import Products from "./Components/Products";
// import About from "./Components/About";
// import Contact from "./Components/Contact";

import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import PropagareLoader from "react-spinners/PropagateLoader";

export default function HomePage() {

  
  let value;
  const history = useHistory();
  if(history.location.state)
  {
    value=history.location.state;
    global.user=value;
    global.orderId=[];
    global.orderName=[];
    global.orderImage=[];
    global.quantity=[];
    global.orderPrices=[];
    //console.log(value);
  }
  
    return (
        <>
          <Navbar />
          <Header />
          <Products />
          <About />
          <Contact />
        </>
    )
}


