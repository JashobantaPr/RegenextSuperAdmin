import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const CreatePrivacy = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showAlert, setShowAlert] = useState(false); // Alert visibility state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setShowAlert(true); // Show alert if the privacy name is missing
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      privacy: name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "addprivacyandPolicy", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result is ", result);
        if (result.status === true) {
          setShowModal(true); // Show modal on success
        } else {
          setShowAlert(true); // Show alert on failure
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`${process.env.PUBLIC_URL}/app/Privacy`); // Navigate back to the Privacy page
  };

  return (
    <>
      <Card
        style={{
          marginTop: "10px",
          marginLeft: "100px",
          padding: "20px",
          width: "500px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Privacy Policy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Privacy Policy"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Card>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Privacy Policy Added Successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert for missing input */}
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          All fields are required!
        </Alert>
      )}
    </>
  );
};

export default CreatePrivacy;
