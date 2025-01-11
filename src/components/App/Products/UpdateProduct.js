import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateProduct = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const iddata = location?.state;
    const navigate = useNavigate();

    useEffect(() => {
        if (showModal) {
            setAlertMessage('');
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct();
    };

    const updateProduct = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "product_id": iddata,
            "productType": name
        });

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "updateProductType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setShowModal(true);
                } else {
                    setAlertMessage("Please Fill All The Fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/Products`);
    };

    return (
        <Card style={{ marginTop: "30px", padding: "20px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary mt-3" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert Message */}
            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </Card>
    );
};

export default UpdateProduct;
