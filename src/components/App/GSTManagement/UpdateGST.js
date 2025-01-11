import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateGST = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [Number, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const iddata = location?.state;
    console.log("iddata is", iddata);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (showModal) {
            setAlertMessage('');
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateGST(); 
    };

    const UpdateGST = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "GST_id": iddata,
            "gstRate": Number
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL+"updateAdminGST", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.Status == true){
                    console.log("result is ", result);
                   setShowModal(true);      
                }  
                else{
                    setAlertMessage("Please Fill All The Fields");
                }       
            })
            .catch((error) => console.error(error));
    };
   
   const navigateToProducts = () => {
       navigate(`${process.env.PUBLIC_URL}/app/GSTManagement`);
   };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Number">
                    <Form.Label>Update GST Rate</Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder="Enter GST Rate"
                        value={Number}
                        onChange={(e) => setName(e.target.value)}
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
                <Modal.Body>GST Rate updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                {/* Display alert if alertMessage is not empty */}
                {alertMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        {alertMessage}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default UpdateGST;
