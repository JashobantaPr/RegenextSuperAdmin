import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const CreateHelpAndSupport = () => {
    const [name, setName] = useState(''); // State for product name
    const [showModal, setShowModal] = useState(false); // Controls visibility of the success modal
    const [showAlert, setShowAlert] = useState(false); // Controls visibility of the alert
    const navigate = useNavigate(); // Navigate after success

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setShowAlert(true); // Show alert if the name is empty
            return;
        }

        // Prepare the request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "HelpAndSupport": name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Send the request to the API
        fetch(`${API_URL}HelpAndSupport`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result is ", result);
                if (result.status === true) {
                    setShowModal(true); // Show modal on success
                } else {
                    setShowAlert(true); // Show alert on failure
                }
            })
            .catch((error) => {
                console.error(error);
                setShowAlert(true); // Show alert if there's an error
            });
    };

    // Handle modal close and navigate to another page
    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/HelpAndSupport`);
    };

    return (
        <>
            {/* Card for the form */}
            <Card 
                style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Add Help and Support</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>

            {/* Modal to show success message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    HelpAndSupport added successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert to show error message */}
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    All fields are required.
                </Alert>
            )}
        </>
    );
};

export default CreateHelpAndSupport;
