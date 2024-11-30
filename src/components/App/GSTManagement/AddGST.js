import { formatDate } from "@fullcalendar/react";
import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddGST = () => {
    const [Number1, setName] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const personal = sessionStorage.getItem("personalid");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "admin_id": personal,
          "gstRate": Number1
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        fetch(API_URL+"addGST", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("result is ",result);
            if(result.status === true){
                setShowModal(true);
            }
            else{
                setShowAlert(true);
            }
        })
        .catch((error) => console.error(error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/GSTManagement`);
    };

    return (
        <>
            <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Number1">
                        <Form.Label>Add Product</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter GST Rate"
                            value={Number1}
                            onChange={(e) => setName(e.target.value)}
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

             {/* Alert to show success message */}
             {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                   All parameters are required fields
                </Alert>
            )}
        </>
    );
};

export default AddGST;
