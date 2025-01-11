import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddGST = () => {
    const [gstRate, setGstRate] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [showAlert, setShowAlert] = useState(false);
    const personal = sessionStorage.getItem("personalid");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            admin_id: personal,
            gstRate: gstRate
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(API_URL + "addGST", requestOptions);
            const result = await response.json();
            console.log("result is", result);

            if (result.status === true) {
                setShowModal(true);
            } else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/GSTManagement`);
    };

    return (
        <>
            <Card className="mx-auto mt-5 p-4" style={{ width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="gstRate">
                        <Form.Label>GST Rate</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter GST Rate"
                            value={gstRate}
                            onChange={(e) => setGstRate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>

            {/* Modal to show success message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>GST Rate Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert to show error message */}
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    All parameters are required fields.
                </Alert>
            )}
        </>
    );
};

export default AddGST;
