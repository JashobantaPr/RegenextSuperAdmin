import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function AreaInfo() {
    const [areaInfo, setAreaInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location?.state._id;
    console.log("userId", userId);

    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!areaInfo) {
            alert("Please fill all required fields.");
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            admin_id: personal,
            user_id: userId,
            areaInfo: [areaInfo],
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(API_URL + "ABMAreaInfo", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result is ABM Area Info Addition ", result);
                registration(result);
            })
            .catch((error) => console.error(error));
    };

    const registration = (resultData) => {
        alert("ABM Area Info Added Successfully");
        navigate(`${process.env.PUBLIC_URL}/app/ABMManagement`, {
            state: resultData,
        });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm w-50 mx-auto">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Add Area Info</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="areaInfo" className="form-label">
                                Area Info
                            </label>
                            <textarea
                                id="areaInfo"
                                className="form-control"
                                placeholder="Enter Area Info"
                                value={areaInfo}
                                onChange={(e) => setAreaInfo(e.target.value)}
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

export default AreaInfo;
