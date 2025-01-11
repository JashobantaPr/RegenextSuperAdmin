import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function ZonalHeadRegistration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get personal ID from sessionStorage
    const personal = sessionStorage.getItem('personalid');
    console.log('Personal ID:', personal);

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            admin_id: personal,
            email,
            password,
            token: 'fgfdwwhjjh', // Token is hardcoded here, consider adding it dynamically if necessary
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch(API_URL + 'ZonalHeadRegistration', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('Registration Result:', result);
                registration(result);
            })
            .catch((error) => console.error('Error:', error));
    };

    const registration = (resultdata) => {
        alert('Zonal Head Registration Successful');
        navigate(`${process.env.PUBLIC_URL}/app/ZonalHeadprofileCreate`, {
            state: resultdata,
        });
    };

    return (
        <div className="container mt-5">
            <div className="card w-50 mx-auto shadow-sm">
                <div className="card-body">
                    <h4 className="text-center mb-4">Zonal Head Registration</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Token is commented out but can be added if necessary */}
                        {/* 
                        <div className="mb-3">
                            <label htmlFor="token" className="form-label">
                                Token
                            </label>
                            <input
                                type="text"
                                id="token"
                                className="form-control"
                                placeholder="Enter token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                required
                            />
                        </div>
                        */}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ZonalHeadRegistration;
