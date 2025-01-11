import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateHelpAndSupport = () => {
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
            "HelpAndSupport_id": iddata,
            "HelpAndSupport": name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "updateHelpAndSupport", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setShowModal(true);      
                } else {
                    setAlertMessage("Please fill in all the fields");
                }       
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/HelpAndSupport`);
    };

    return (
        <Card style={{ marginTop: "30px", padding: "20px", width: "500px", marginLeft: "auto", marginRight: "auto" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Help and Support</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <Modal.Body>Help and Support has been updated successfully!</Modal.Body>
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

export default UpdateHelpAndSupport;
