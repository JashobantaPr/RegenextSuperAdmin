import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdatePrivacy = () => {
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
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "privacy_id": iddata,
            "privacy": name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "updateprivacy", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setShowModal(true); // Show success modal
                } else {
                    setAlertMessage("Please fill all the fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/Privacy`);
    };

    return (
        <div className="container mt-4">
            <Card className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Update Privacy Management</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Privacy Policy"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>

            {/* Success Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Privacy Management updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert Message */}
            {alertMessage && (
                <div className="alert alert-warning mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default UpdatePrivacy;
