import React, { useState } from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function FinanceHeadRegistration() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const personal = sessionStorage.getItem("personalid");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            admin_id: personal,
            email: email,
            password: password,
            token: "fgfdwwhjjh"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(API_URL + "financeHeadRegistration", requestOptions);
            const result = await response.json();
            if (result.Status === true) {
                setData(result);
                setShowModal(true);
            } else {
                setAlertMessage("Please provide all required fields");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/FinanceHeadProfileCreate`, {
            state: data
        });
    };

    return (
        <div className="container mt-5">
            <div className="card w-50 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h5 className="card-title">Email</h5>
                        <div className="mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <h5 className="card-title">Password</h5>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}

            {data && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Body style={{ textAlign: "center", padding: "20px" }}>
                        {data.message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShowModal(false); handleRegistration(); }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default FinanceHeadRegistration;
