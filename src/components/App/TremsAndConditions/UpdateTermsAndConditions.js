import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateTermsAndConditions = () => {
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message
    const [name, setName] = useState(''); // State for name input
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const location = useLocation();
    const iddata = location?.state; // Get the ID from the location state
    const navigate = useNavigate();

    useEffect(() => {
        if (showModal) {
            setAlertMessage(''); // Reset alert message when modal is shown
        }
    }, [showModal]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct();
    };

    // Update TermsAndConditions API request
    const updateProduct = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "Term_id": iddata,
            "Terms": name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "updateTerm", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status) {
                    setShowModal(true); // Show success modal
                } else {
                    setAlertMessage("Please fill all the fields");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    // Navigate back to Terms and Conditions page
    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/TremsAndConditions`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Terms and Conditions</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name on change
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>

            {/* Modal for success message */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Terms and Conditions updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert message */}
            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </Card>
    );
};

export default UpdateTermsAndConditions;
