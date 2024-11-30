import { formatDate } from "@fullcalendar/react";
import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddInventory = () => {
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
            "categoryType": Cname,
            "date": "13-04-2025"
          });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        fetch(API_URL+"addInventory", requestOptions)
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
        navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
    };

    return (
        <>
            <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Add stockist</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter stockist Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Add openingStock</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={name}
                            onChange={(e) => setOVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={name}
                            onChange={(e) => setOValue(e.target.value)}
                        />
                        <Form.Label>Add purchase</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={name}
                            onChange={(e) => setPVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={name}
                            onChange={(e) => setPValue(e.target.value)}
                        />
                        <Form.Label>Add Sales</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={name}
                            onChange={(e) => setSVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={name}
                            onChange={(e) => setSValue(e.target.value)}
                        />
                        <Form.Label>Add closingStock</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={name}
                            onChange={(e) => setCVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={name}
                            onChange={(e) => setCValue(e.target.value)}
                        />
                        <Form.Label>Select Stockist Category</Form.Label>
                        <select type="text"
                            placeholder="Select Category Type"
                            value={Cname}
                            onChange={(e) => setCname(e.target.value)}
                            style={{width:460}}>
                            <th>Active</th>
                            <th>InActive</th>
                            </select>
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
                <Modal.Body>Inventory Added Successfully</Modal.Body>
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

export default AddInventory;
