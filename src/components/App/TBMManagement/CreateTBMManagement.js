import React, { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const CreateTBMManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
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
        formData.append("image", image);

        // Debugging: log form data
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(API_URL + "TBMprofileCreate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please fill all the fields.");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Update image state when a file is selected
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/TBMManagement`);
    };

    return (
        <Card style={{ marginTop: "20px", marginLeft: "100px", padding: "30px", maxWidth: "600px" }}>
            <h3 className="text-center mb-4">Create TBM Management</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="mobileNumber" className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="pincode" className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>

            {/* Display alert if alertMessage is not empty */}
            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{data?.message || "Success"}</Modal.Title>
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

export default CreateTBMManagement;
