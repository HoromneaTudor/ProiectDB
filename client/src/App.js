//import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import SignUp from "./Components/SignUp";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
//import home from "./Components/home";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Products from "./Components/Products";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import PropagareLoader from "react-spinners/PropagateLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/HomePage";
import ItemAdd from "./Components/Administrator";
import UpdateItem from "./Components/AdministratorUpdate";
import DeleteItem from "./Components/AdministratorDelete";
import YourCart from "./Components/YourCart";
import ShowAllProducts from "./Components/ShowAllProducts";
import YourOrders from "./Components/YourOrders";
import OrderDetails from "./Components/OrderDetails";

function App() {
  const [loading, setLoading] = useState(false);
  // const override = css({
  //   display: "block",
  //   borderColor: "red",
  //   margintop: "20%",
  // }); //asa oare?
  const override = css`
    display: block;
    border-color: red;
    margin-top: 20%;
  `;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //<div className="w-100" style={{ maxWidth: "400px" }}></div>

  //sa vad cu divul ala care nu isi face treaba

  return (
    <div className="App">
      {loading ? (
        <PropagareLoader
          color={"#1d2514"}
          loading={loading}
          css={override}
          size={40}
        />
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div>
            <Router>
              <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={HomePage}></Route>
                <Route path="/addItem" component={ItemAdd}></Route>
                <Route path="/updateItem" component={UpdateItem}></Route>
                <Route path="/deleteItem" component={DeleteItem}></Route>
                <Route path="/yourCart" component={YourCart}></Route>
                <Route path="/ShowAllItems" component={ShowAllProducts}></Route>
                <Route path="/orders" component={YourOrders}></Route>
                <Route path="/orderDetail" component={OrderDetails}></Route>
              </Switch>
            </Router>
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
