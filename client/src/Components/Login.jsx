import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpResponse, setResponse] = useState("");
  const [user, setUser] = useState([]);
  const history = useHistory();

  const login = (emailRef, passwordRef) => {
    //console.log(emailRef);
    //console.log(passwordRef);
    return axios
      .post("http://localhost:2000/login", {
        email: emailRef,
        password: passwordRef,
      })
      .then((response) => {
        if (response.data.message) {
          return response.data.message;
        } else {
          //setUser(response.data);
          //console.log(user);
          setLoading(false);
          return response.data;
        }
      });
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let result = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      //console.log(result.length);
      if (result.length == 1) {
        history.push({ pathname: "/", state: result });
      } else {
        setError("Failed to sign in");
      }

      //console.log(result);
      //setUser(result);
      //console.log(user);
    } catch {
      setError("Failed to sign in");
    }
    //if (loading == false) {
    //  console.log(user);
    //}
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log Ip</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {user.length != 0 && <Alert variant="danger">{user[0][1]}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>{" "}
      </div>
      <div className="w-100 text-center mt-2">
        Back to homepage <Link to="/home">Back home</Link>
      </div>
    </>
  );
}
