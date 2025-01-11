import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateMarketingMaterial = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const iddata = location?.state?._id; // Get the ID passed from the previous screen
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMarketingMaterial();
    };

    // Update marketing material with API call
    const updateMarketingMaterial = () => {
        if (!name || !file) {
            setAlertMessage("Please provide all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("marketingMaterial_id", iddata);
        formData.append("marketingMaterial", name);
        formData.append("image", file);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        fetch(API_URL + "updateMarketingMaterial", requestOptions)
            .then((response) => response.text()) // Use text() as per your example
            .then((result) => {
                console.log(result);
                setShowModal(true); // Show modal on success
            })
            .catch((error) => {
                console.error(error);
                setAlertMessage("An error occurred while updating marketing material.");
            });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Navigate to MarketingMaterial page
    const redirectToMarketingMaterial = () => {
        navigate(`${process.env.PUBLIC_URL}/app/MarketingMaterial`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Marketing Material Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="file" className="mt-3">
                    <Form.Label>Upload New Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Marketing Material updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={redirectToMarketingMaterial}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </Card>
    );
};

export default UpdateMarketingMaterial;
