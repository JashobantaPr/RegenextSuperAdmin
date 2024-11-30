import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateInventory = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [name, setName] = useState('');
    const [OVolume, setOVolume] = useState('');
    const [OValue, setOValue] = useState('');
    const [PVolume, setPVolume] = useState('');
    const [PValue, setPValue] = useState('');
    const [SVolume, setSVolume] = useState('');
    const [SValue, setSValue] = useState('');
    const [CVolume, setCVolume] = useState('');
    const [CValue, setCValue] = useState('');
    const [Cname, setCname] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const iddata = location?.state;
    console.log("iddata is", iddata);
    const Iname = location?.state;
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
            "admin_id": iddata,
            "inventory_id": Iname,
            "stockist": name,
            "openingStock": {
              "volume": OVolume,
              "value": OValue
            },
            "purchase": {
              "volume": PVolume,
              "value": PValue
            },
            "sales": {
              "volume": SVolume,
              "value": SValue
            },
            "closingStock": {
              "volume": CVolume,
              "value": CValue
            },
            "inventoryDays": 28,
            "categoryType": Cname
            
          });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL+"updateInventory", requestOptions)
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
       navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
   };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Update Inventory</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setOVolume(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setOValue(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setPVolume(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setPValue(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setSVolume(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setSValue(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setCVolume(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setCValue(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setCname(e.target.value)}
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
                <Modal.Body>Inventory updated successfully!</Modal.Body>
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

export default UpdateInventory;
