import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateMarketingMaterial = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null); // State to store the selected file
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const iddata = location?.state?._id; // Get the ID passed from the previous screen
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMarketingMaterial();
    };

    const updateMarketingMaterial = () => {
        if (!name || !file) {
            setAlertMessage("Please provide all required fields.");
            return;
        }

        const formdata = new FormData();
        formdata.append("marketingMaterial_id", iddata);
        formdata.append("marketingMaterial", name);
        formdata.append("image", file); // Modified to match your provided snippet

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        // Change the API URL to the one you provided
        fetch(API_URL +"updateMarketingMaterial", requestOptions)
            .then((response) => response.text()) // Using text() instead of json() as per your example
            .then((result) => {
                console.log(result); // Logs the server response
                setShowModal(true); // Show modal on success
            })
            .catch((error) => {
                console.error(error);
                setAlertMessage("An error occurred while updating marketing material.");
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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
                <Button variant="primary mt-3" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Modal for success message */}
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

            {/* Display alert if alertMessage is not empty */}
            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </Card>
    );
};

export default UpdateMarketingMaterial;
