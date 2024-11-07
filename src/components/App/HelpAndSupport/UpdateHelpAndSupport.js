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
    console.log("iddata is", iddata);
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
        fetch(API_URL+"updateHelpAndSupport", requestOptions)
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
       navigate(`${process.env.PUBLIC_URL}/app/HelpAndSupport`);
   };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update  UpdateHelpAndSupport</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
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
                <Modal.Body>UpdateHelpAndSupport updated successfully!</Modal.Body>
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

export default UpdateHelpAndSupport;
