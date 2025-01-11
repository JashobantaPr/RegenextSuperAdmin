import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const CreateVisit = () => {
    const [name, setName] = useState(''); // State to hold the VisitType name
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        createVisitType(); 
    };

    // Function to make API request to add VisitType
    const createVisitType = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "visitType": name // Sending visitType as a parameter in the request
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Fetch request to the API
        fetch(API_URL + "addVisitType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setShowModal(true); // Show success modal on success
                } else {
                    setShowAlert(true); // Show alert if the response is unsuccessful
                }
            })
            .catch((error) => console.error("Error:", error)); // Error handling
    };

    // Handle closing of the modal and navigating to another page
    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/VisitType`); // Navigate to VisitType page
    };

    return (
        <>
            <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Add VisitType</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter visit type name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name value on change
                        />
                    </Form.Group>
                    <Button variant="primary mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Visit Type Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert for missing parameters */}
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    All parameters are required fields
                </Alert>
            )}
        </>
    );
};

export default CreateVisit;
