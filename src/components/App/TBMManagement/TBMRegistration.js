import React, { useState } from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function TBMRegistration() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

        fetch(API_URL + "TBMRegistration", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status == true) {
                    console.log("result is Tbm Registration ", result);
                    setData(result);
                    setShowModal(true);
                } else {
                    setAlertMessage("Please provide all required fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const registration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/CreateTBMManagement`, {
            state: data
        });
    };

    return (
        <div className="container mt-5">
            <div className="card w-50 mx-auto">
                <div className="card-body">
                    <form>
                        <h5 className="card-title">Email</h5>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <h5 className="card-title">Password</h5>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            <div>
                {/* Display alert if alertMessage is not empty */}
                {alertMessage && (
                    <div className="alert alert-success" role="alert">
                        {alertMessage}
                    </div>
                )}
            </div>

            {data && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Title style={{textAlign:"center",marginTop:"20px",marginBottom:"20px"}}>{data.message}</Modal.Title>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShowModal(false); registration(); }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default TBMRegistration;
