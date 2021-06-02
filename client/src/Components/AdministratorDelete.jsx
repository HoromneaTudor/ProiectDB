import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DeleteItem() {

    const numeRef = useRef();
  const qunatityRef = useRef();
  const categoryRef = useRef();
  const importRef = useRef();
  const imageRef = useRef();
  const phoneRef = useRef();
  const idRef=useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpResponse, setResponse] = useState("");


  const edit = (
   idRef
    //passwordConfirmRef
  ) => {

    console.log(idRef);
    //console.log(numeref+" "+quantityRef+" "+categoryRef+" "+importRef+" "+imageRef);
    //console.log(emailRef);
    return axios
      .delete("http://localhost:2000/deleteItem", {
        data:{id:idRef}
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

    //if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //  return setError("Passwords do not match");
    //}

    try {
      setError("");
      setLoading(true);
      await edit(
        idRef.current.value
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
              <h2 className="text-center mb-4">Delete Item</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignUp}>
                
                <Form.Group id="text">
                  <Form.Label>Id of the item you waht to delete (permanentely)</Form.Label>
                  <Form.Control
                    type="text"
                    ref={idRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                
                <Button disabled={loading} className="w-100" type="submit">
                  Delete
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
        Back to homepage <Link to="/home">Back home</Link>
      </div>
      <div className="w-100 text-center mt-2">
          Edit an existing item<Link to="/updateItem">Edit</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Add New Item<Link to="/addItem">New Item</Link>
      </div>
        </>
    );
}

export default DeleteItem
