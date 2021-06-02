//import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import home from "./components/home";
import Navbar from "./components/Navbar";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import PropagareLoader from "react-spinners/PropagateLoader";

function App() {
  const [loading, setLoading] = useState(false);
  const override = css({
    display: "block",
    borderColor: "red",
    margintop: "20%",
  }); //asa oare?

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //sa vad cu divul ala care nu isi face treaba

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {loading ? (
        <PropagareLoader
          color={"#3d2514"}
          loading={loading}
          css={override}
          size={40}
        />
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
              <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={home}></Route>
              </Switch>
            </Router>
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
