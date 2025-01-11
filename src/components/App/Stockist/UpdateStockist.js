import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../../server";

const UpdateStockist = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const stockistData = location.state?.stockistData || {}; // Ensure this is not undefined
    const [stockist_id, setStockistID] = useState(stockistData._id || ""); // Ensure stockist_id is available
    const [name, setName] = useState(stockistData.stockist || "");
    const [contactNumber, setContactNumber] = useState(stockistData.contactNumber || ""); // Fixed typo
    const [address, setAddress] = useState(stockistData.address || "");
    const [status, setStatus] = useState(stockistData.stockistStatus || "Active");
    const [showModal, setShowModal] = useState(false); // Initialize as boolean
    const [alertMessage, setAlertMessage] = useState(""); // State for dynamic error messages

    useEffect(() => {
        console.log("stockist_id initialized as:", stockist_id);
    }, [stockist_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the form data before submitting
        console.log("Form Data being submitted:", { stockist_id, name, contactNumber, address, status });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            stockist_id: stockist_id,
            stockist: name,
            contactNumber: contactNumber,
            address: address,
            stockistStatus: status,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(API_URL + "updateStockist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
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
        setShowModal(false); // Close the modal first
        navigate(`${process.env.PUBLIC_URL}/app/Stockist`); // Navigate to the Stockist page
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
