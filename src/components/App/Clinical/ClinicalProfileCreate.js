import { useState } from "react";
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
    const [image, setImage] = useState(null);

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

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(API_URL + "clinicalProfileCreate", requestOptions)
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
        navigate(`${process.env.PUBLIC_URL}/app/Clinical`);
    };

    return (
        <Card style={{ marginTop: "20px", padding: "20px", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
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

                <Button variant="primary" type="submit" className="mt-3 w-100">
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
                <Modal.Body style={{ textAlign: "center" }}>
                    <h4>{data ? data.message : ""}</h4>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default ClinicalProfileCreate;
