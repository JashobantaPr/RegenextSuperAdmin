import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateVisit = () => {
    // State hooks for form and alert handling
    const [name, setName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // Fetching data from the location object (previous state passed by the navigate function)
    const location = useLocation();
    const iddata = location?.state;
    
    const navigate = useNavigate();

    // Clear alert message when modal is shown
    useEffect(() => {
        if (showModal) {
            setAlertMessage('');
        }
    }, [showModal]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        updateVisitType();
    };

    // Function to handle the API call for updating VisitType
    const updateVisitType = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "visit_id": iddata,
            "visitType": name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Make the API request
        fetch(API_URL + "updateVisitType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setShowModal(true);  // Show success modal if update is successful
                } else {
                    setAlertMessage("Please fill all the fields correctly.");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    // Function to navigate back to the VisitType page
    const navigateToVisitTypes = () => {
        navigate(`${process.env.PUBLIC_URL}/app/VisitType`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            {/* Form to update VisitType */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Visit Type Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter visit type name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update state when input changes
                    />
                </Form.Group>
                <Button variant="primary mt-3" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Visit Type updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToVisitTypes}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert for showing validation message */}
            {alertMessage && (
                <Alert variant="danger" className="mt-3">
                    {alertMessage}
                </Alert>
            )}
        </Card>
    );
};

export default UpdateVisit;
