import React, { useEffect, useState } from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function TBMRegistration() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [zonalHead, setZonalHead] = useState([]);
    const [selectedZonalHead, setSelectedZonalHead] = useState('');
    const [abm, setABM] = useState([]);
    const [selectedABM, setSelectedABM] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);

    useEffect(() => {
        getZonalHead();
        getABM();
    }, []);

    const getZonalHead = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(API_URL + "getAllZonal", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === true) {
                    setZonalHead(result.users);
                }
            })
            .catch((error) => console.error(error));
    };

    const getABM = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(API_URL + "getAllABM", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === true) {
                    setABM(result.users);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "email": email,
            "ZH_id": selectedZonalHead,
            "abm_id": selectedABM,
            "password": password,
            "token": "fgfdwwhjjh"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "TBMRegistrationNew", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === true) {
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
            <div className="card w-75 mx-auto shadow-sm">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">TBM Registration</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
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

                        <div className="form-group mb-3">
                            <label htmlFor="zonalHead" className="form-label">Select Zonal Head</label>
                            <select
                                id="zonalHead"
                                className="form-control"
                                value={selectedZonalHead}
                                onChange={(e) => setSelectedZonalHead(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Zonal Head</option>
                                {zonalHead.map((zh) => (
                                    <option key={zh._id} value={zh._id}>{zh.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="abm" className="form-label">Select ABM</label>
                            <select
                                id="abm"
                                className="form-control"
                                value={selectedABM}
                                onChange={(e) => setSelectedABM(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select ABM</option>
                                {abm.map((abm) => (
                                    <option key={abm._id} value={abm._id}>{abm.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
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

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary w-50">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            {alertMessage && (
                <div className="alert alert-warning mt-3 text-center" role="alert">
                    {alertMessage}
                </div>
            )}

            {data && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body className="text-center">
                        <h5>{data.message}</h5>
                    </Modal.Body>
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

export default TBMRegistration;
