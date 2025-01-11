import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddMarketingMaterial = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null); // State to store the selected file
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const personal = sessionStorage.getItem("personalid");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that both name and file are provided
        if (!name || !file) {
            setShowAlert(true);
            return;
        }

        // Create FormData for the file and other data
        const formData = new FormData();
        formData.append("admin_id", personal);
        formData.append("marketingMaterial", name);
        formData.append("image", file);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        fetch(API_URL + "addMarketingMaterial", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setShowModal(true);
                } else {
                    setShowAlert(true);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/MarketingMaterial`);
    };

    return (
        <>
            <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Add Marketing Material</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="file" className="mt-3">
                        <Form.Label>Upload Image</Form.Label>
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
            </Card>

            {/* Modal for success message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Marketing Material Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error alert if validation fails */}
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    All fields, including an image, are required.
                </Alert>
            )}
        </>
    );
};

export default AddMarketingMaterial;
