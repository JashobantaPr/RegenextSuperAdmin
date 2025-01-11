import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const ZonalHeadprofileCreate = () => {
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

        // Log formData for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        fetch(API_URL + "ZonalHeadprofileCreate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("Result is", result);
                navigate(`${process.env.PUBLIC_URL}/app/Zonal`);
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Card style={{ marginTop: "20px", padding: "20px" }}>
            <h3 className="text-center mb-4">Create Zonal Head Profile</h3>
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
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Submit
                </Button>
            </Form>
        </Card>
    );
};

export default ZonalHeadprofileCreate;
