import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddProduct = () => {
    const [name, setName] = useState(''); // Product name
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [showAlert, setShowAlert] = useState(false); // Alert visibility state
    const personal = sessionStorage.getItem("personalid"); // Get personal ID from session
    const navigate = useNavigate(); // For navigation after success

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create headers for the request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // Prepare the data to send in the request
        const raw = JSON.stringify({
            "admin_id": personal,
            "productType": name
        });

        // Request options
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Sending request to the server
        fetch(API_URL + "addProductType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setShowModal(true); // Show success modal
                } else {
                    setShowAlert(true); // Show alert for missing parameters
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        navigate(`${process.env.PUBLIC_URL}/app/Products`); // Navigate to products page
    };

    return (
        <>
            {/* Card for the form */}
            <Card style={{ marginTop: "10px", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Add Product</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
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
                <Modal.Body>Product added successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert for missing parameters */}
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    All fields are required.
                </Alert>
            )}
        </>
    );
};

export default AddProduct;
