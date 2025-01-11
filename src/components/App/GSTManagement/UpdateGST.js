import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateGST = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [gstRate, setGstRate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const gstId = location?.state;
    const navigate = useNavigate();

    useEffect(() => {
        if (showModal) {
            setAlertMessage('');
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGST();
    };

    const updateGST = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            GST_id: gstId,
            gstRate
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + 'updateAdminGST', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status) {
                    setShowModal(true);
                } else {
                    setAlertMessage('Please Fill All The Fields');
                }
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/GSTManagement`);
    };

    return (
        <Card className="update-gst-card">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="gstRate">
                    <Form.Label>Update GST Rate</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter GST Rate"
                        value={gstRate}
                        onChange={(e) => setGstRate(e.target.value)}
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
                <Modal.Body>GST Rate updated successfully!</Modal.Body>
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

export default UpdateGST;
