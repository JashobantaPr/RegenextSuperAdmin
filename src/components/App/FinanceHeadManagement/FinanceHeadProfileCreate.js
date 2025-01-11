import { formatDate } from "@fullcalendar/react";
import React, { useState } from "react";
import { Form, Button, Card, Modal} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const FinanceHeadProfileCreate = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [image, setImage] = useState(null); // Initialize image state as null
    const location = useLocation();
    const totaldata = location?.state;
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("admin_id", totaldata.user.admin_id);
        formData.append("user_id", totaldata.user._id);
        formData.append("name", name);
        formData.append("mobileNumber", mobileNumber);
        formData.append("phoneNumber", phoneNumber);
        formData.append("address", address);
        formData.append("pincode", pincode);
        formData.append("image", image); // Append the image file directly

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(API_URL + "financeHeadProfileCreate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    console.log("result is", result)
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please Fill All The Fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (e) => {
        // Update the image state when a file is selected
        setImage(e.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/Finance`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px" }}>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary mt-3" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Display alert if alertMessage is not empty */}
            {alertMessage && (
                <div className="alert alert-success" role="alert" style={{ marginTop: "20px" }}>
                    {alertMessage}
                </div>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Title style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
                    {data ? data.message : ""}
                </Modal.Title>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default FinanceHeadProfileCreate;
