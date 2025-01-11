import { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const FinanceHeadProfileCreate = () => {
    const [showModal, setShowModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [data, setData] = useState(null);

    const [formFields, setFormFields] = useState({
        name: '',
        mobileNumber: '',
        phoneNumber: '',
        address: '',
        pincode: '',
        image: null
    });

    const location = useLocation();
    const totaldata = location?.state;
    const navigate = useNavigate();

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle image file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormFields((prevState) => ({
            ...prevState,
            image: file
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("admin_id", totaldata.user.admin_id);
        formData.append("user_id", totaldata.user._id);

        Object.keys(formFields).forEach((key) => {
            formData.append(key, formFields[key]);
        });

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(API_URL + "financeHeadProfileCreate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please fill all the fields");
                }
            })
            .catch((error) => console.error(error));
    };

    // Handle modal close and redirect
    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/Finance`);
    };

    return (
        <Card className="p-4" style={{ marginTop: "10px", marginLeft: "100px" }}>
            <Form onSubmit={handleSubmit}>
                {/* Name Field */}
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formFields.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Mobile Number Field */}
                <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter mobile number"
                        value={formFields.mobileNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Phone Number Field */}
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={formFields.phoneNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Address Field */}
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={formFields.address}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Pincode Field */}
                <Form.Group controlId="pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        value={formFields.pincode}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Image Upload Field */}
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary mt-3" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Alert Message */}
            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body className="text-center">
                    <h4>{data ? data.message : ''}</h4>
                </Modal.Body>
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
