import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpResponse, setResponse] = useState("");

  //const { signup } = useAuth();

  const signUp = (
    emailRef,
    firstNameRef,
    lastNameRef,
    phoneRef,
    passwordRef,
    passwordConfirmRef
  ) => {
    //console.log(emailRef);
    return axios
      .post("http://localhost:2000/signup", {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
        password: passwordRef,
      })
      .then((response) => {
        if (response.data.message) {
          setResponse(response.data.message);
        } else {
          setResponse("Registration was successfull");
          let res = response.data;
          return res;
        }
      });

    //console.log(passwordRef);
  };

  async function handleSignUp(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        phoneRef.current.value,
        passwordRef.current.value,
        passwordConfirmRef.current.value
      );
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignUp}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="test@test.test"
                type="email"
                ref={emailRef}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="Alin"
                type="text"
                ref={firstNameRef}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Alin"
                type="text"
                ref={lastNameRef}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                placeholder="0767894578"
                type="tel"
                ref={phoneRef}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Allready have an account? <Link to="/login">Log In</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Back to homepage <Link to="/home">Back home</Link>
      </div>
    </>
  );
}
