import React, { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const ClinicalProfileCreate = () => {
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

        fetch(API_URL + "MHProfileCreate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please Fill All The Fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/MHManagement`);
    };

    return (
        <Card className="mt-4 mx-auto p-4" style={{ maxWidth: "600px" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>

            {alertMessage && (
                <div className="alert alert-warning mt-3" role="alert">
                    {alertMessage}
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{data ? data.message : "Success"}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default ClinicalProfileCreate;
