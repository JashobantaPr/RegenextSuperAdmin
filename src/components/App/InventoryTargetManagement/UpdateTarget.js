import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateTarget = () => {
    const location = useLocation();
    const iddata = location?.state;
    console.log("iddata is", iddata);
    const Iname = location?.state;
    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);
    const [alertMessage, setAlertMessage] = useState('');
    const [MVolume, setMVolume] = useState(iddata.monthVolume);
    const [MValue, setMValue] = useState(iddata.monthValue);
    const [YVolume, setYVolume] = useState(iddata.yearVolume);
    const [YValue, setYValue] = useState(iddata.yearValue);
    const [showModal, setShowModal] = useState(false);
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
            admin_id: personal || '',
            financeTarget_id: Iname || '',
            monthVolume: MVolume,
            monthValue: MValue,
            yearVolume: YVolume,
            yearValue: YValue

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "updateFinanceTarget", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    console.log("result is ", result);
                    setShowModal(true);
                }
                else {
                    setAlertMessage("Please Fill All The Fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/Target`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="name">
                    <Form.Label><h4>Update Inventory Target</h4></Form.Label>
                    <Form.Label>Update MonthlyTarget</Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder="Enter Data"
                        value={MVolume}
                        onChange={(e) => setMVolume(e.target.value)}
                    />
                    <Form.Control
                        type="Number"
                        placeholder="Enter Value"
                        value={MValue}
                        onChange={(e) => setMValue(e.target.value)}
                    />
                    <Form.Label>Update YearlyTarget</Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder="Enter data"
                        value={YVolume}
                        onChange={(e) => setYVolume(e.target.value)}
                    />
                    <Form.Control
                        type="Number"
                        placeholder="Enter Value"
                        value={YValue}
                        onChange={(e) => setYValue(e.target.value)}
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
                <Modal.Body>Inventory Target updated successfully!</Modal.Body>
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

export default UpdateTarget;
