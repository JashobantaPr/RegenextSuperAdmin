import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function TBMRegistration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zonalHead, setZonalHead] = useState([]);
    const [selectedZonalHead, setSelectedZonalHead] = useState('');
    const navigate = useNavigate();

    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);

    useEffect(() => {
        getZonalHead();
    }, []);

    const getZonalHead = () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(API_URL + 'getAllZonal', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.status === true) {
                    setZonalHead(result.users);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        console.log('ZH_id', selectedZonalHead);

        const raw = JSON.stringify({
            admin_id: personal,
            email: email,
            ZH_id: selectedZonalHead,
            password: password,
            token: 'fgfdwwhjjh'
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + 'ABMRegistrationNew', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('result is Abm Registration ', result);
                registration(result);
            })
            .catch((error) => console.error(error));
    };

    const registration = (resultData) => {
        alert('ABM Registration Successful');
        navigate(`${process.env.PUBLIC_URL}/app/CreateABMManagement`, {
            state: resultData
        });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm w-50 mx-auto">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">ABM Registration</h4>
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
                            <label htmlFor="zonalHead" className="form-label">Zonal Head</label>
                            <select
                                className="form-select"
                                id="zonalHead"
                                value={selectedZonalHead}
                                onChange={(e) => setSelectedZonalHead(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Select Zonal Head
                                </option>
                                {zonalHead.map((zh) => (
                                    <option key={zh._id} value={zh._id}>
                                        {zh.name}
                                    </option>
                                ))}
                            </select>
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

export default TBMRegistration;
