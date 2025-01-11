import React, { useState } from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function ClinicalRegistration() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "email": email,
            "password": password,
            "token": "fgfdwwhjjh"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "clinicalRegistration", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
                    console.log("result is clinicalRegistration", result);
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please provide all required fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const registration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/ClinicalProfileCreate`, {
            state: data
        });
    };

    return (
        <div className="container mt-5">
            <div className="card w-50 mx-auto shadow-sm">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Clinical Registration</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit" className="w-100">Submit</Button>
                    </form>
                </div>
            </div>

            {/* Alert message */}
            {alertMessage && (
                <Alert variant="danger" className="mt-3">
                    {alertMessage}
                </Alert>
            )}

            {/* Modal for success */}
            {data && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="w-100 text-center">{data.message}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer className="justify-content-center">
                        <Button variant="secondary" onClick={() => { setShowModal(false); registration(); }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ClinicalRegistration;
