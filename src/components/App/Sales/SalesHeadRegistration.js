import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function SalesHeadRegistration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const personal = sessionStorage.getItem("personalid");
    
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

        fetch(API_URL + "salesHeadRegistration", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("Sales Registration Result: ", result);
                registration(result);
            })
            .catch((error) => console.error(error));
    }

    const registration = (resultdata) => {
        alert("Sales profile created successfully");
        navigate(`${process.env.PUBLIC_URL}/app/salesProfileCreate`, {
            state: resultdata
        });
    }

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

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalesHeadRegistration;
