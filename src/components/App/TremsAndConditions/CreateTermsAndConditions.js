import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddTerms = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestData = JSON.stringify({
      "Terms": name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestData,
      redirect: "follow",
    };

    fetch(API_URL + "termsAndCondtion", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          setShowModal(true); // Show success modal
        } else {
          setShowAlert(true); // Show alert if submission fails
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Close the success modal and navigate to another page
  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`${process.env.PUBLIC_URL}/app/TremsAndConditions`);
  };

  return (
    <>
      <Card style={styles.card}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Add Product</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Card>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Terms and Conditions Added Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert for missing required fields */}
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          All parameters are required fields
        </Alert>
      )}
    </>
  );
};

// Inline styles for better layout management
const styles = {
  card: {
    marginTop: "10px",
    marginLeft: "100px",
    padding: "20px",
    width: "500px",
  },
};

export default AddTerms;
