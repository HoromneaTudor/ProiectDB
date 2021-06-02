import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ItemUpdate() {

    const numeRef = useRef();
  const qunatityRef = useRef();
  const categoryRef = useRef();
  const importRef = useRef();
  const imageRef = useRef();
  const idRef=useRef();
  const pretRef=useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpResponse, setResponse] = useState("");


  const edit = (
    numeref,
    quantityRef,
    categoryRef,
    importRef,
    imageRef,
    idref,
    pretRef
    //passwordConfirmRef
  ) => {
    //console.log(emailRef);
    return axios
      .patch("http://localhost:2000/updateItem", {
        nume: numeref,
        quantity: quantityRef,
        category: categoryRef,
        import: importRef,
        image:imageRef,
        id:idref,
        pret:pretRef,
        //password: imageRef,
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
        numeRef.current.value,
        qunatityRef.current.value,
        categoryRef.current.value,
        importRef.current.value,
        imageRef.current.value,
        idRef.current.value,
        pretRef.current.value,
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
              <h2 className="text-center mb-4">Update Item</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignUp}>
              <Form.Group id="id">
                  <Form.Label>Id of the item you with to edit</Form.Label>
                  <Form.Control
                    placeholder="Id"
                    type="text"
                    ref={idRef}
                    required
                  ></Form.Control>
                </Form.Group>
                  
                <Form.Group id="firsName">
                  <Form.Label>Nume Produs</Form.Label>
                  <Form.Control
                    placeholder="Apple"
                    type="text"
                    ref={numeRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group id="first_name">
                  <Form.Label>Produs de import?</Form.Label>
                  <Form.Control
                    placeholder="Da/Nu"
                    type="text"
                    ref={importRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group id="last_name">
                  <Form.Label>Image Link</Form.Label>
                  <Form.Control
                    placeholder=""
                    type="text"
                    ref={imageRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group id="phone">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    placeholder="Fruits"
                    type="tel"
                    ref={categoryRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group id="text">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    ref={qunatityRef}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group id="text">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    ref={pretRef}
                    required
                  ></Form.Control>
                </Form.Group>
    
                
                <Button disabled={loading} className="w-100" type="submit">
                  Edit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
        Back to homepage <Link to="/home">Back home</Link>
      </div>
      <div className="w-100 text-center mt-2">
          Add a new item<Link to="/addItem">New Item</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Delete an existing Item<Link to="/deleteItem">Delete</Link>
      </div>
        </>
    );
}

export default ItemUpdate
