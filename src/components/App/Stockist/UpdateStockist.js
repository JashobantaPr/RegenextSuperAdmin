import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../../server";

const UpdateStockist = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const stockistData = location.state?.stockistData || {}; // Ensure it's not undefined
    const [stockistID, setStockistID] = useState(stockistData._id || "");
    const [name, setName] = useState(stockistData.stockist || "");
    const [contactNumber, setContactNumber] = useState(stockistData.contactNumber || ""); // Fixed typo
    const [address, setAddress] = useState(stockistData.address || "");
    const [status, setStatus] = useState(stockistData.stockistStatus || "Active");
    const [showModal, setShowModal] = useState(false); // Modal state
    const [alertMessage, setAlertMessage] = useState(""); // Error message state

    useEffect(() => {
        console.log("Stockist ID initialized as:", stockistID);
    }, [stockistID]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log form data before submitting
        console.log("Form Data being submitted:", { stockistID, name, contactNumber, address, status });

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stockist_id: stockistID,
                stockist: name,
                contactNumber,
                address,
                stockistStatus: status,
            }),
        };

        fetch(API_URL + "updateStockist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setShowModal(true); // Show success modal
                } else {
                    setAlertMessage(result.message || "An unexpected error occurred.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setAlertMessage("Failed to connect to the server. Please try again.");
            });
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
        navigate(`${process.env.PUBLIC_URL}/app/Stockist`); // Navigate to Stockist page
    };

    return (
        <>
            {alertMessage && (
                <Alert variant="danger" onClose={() => setAlertMessage("")} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <Card style={{ margin: "20px auto", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Stockist Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </Form.Group>

                    <Form.Group controlId="contactNumber" className="mt-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Enter contact number"
                        />
                    </Form.Group>

                    <Form.Group controlId="address" className="mt-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                        />
                    </Form.Group>

                    <Form.Group controlId="status" className="mt-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Control>
                    </Form.Group>

                    <Button className="mt-3" type="submit">
                        Update
                    </Button>
                </Form>
            </Card>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Stockist updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateStockist;
