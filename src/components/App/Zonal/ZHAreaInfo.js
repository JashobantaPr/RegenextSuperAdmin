import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function ZHAreaInfo() {
    const [areaInfo, setAreaInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location?.state?._id;
    const personalId = sessionStorage.getItem("personalid");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!areaInfo) {
            alert("Please fill in the required field.");
            return;
        }

        const requestPayload = {
            admin_id: personalId,
            user_id: userId,
            areaInfo: [areaInfo],
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload),
            redirect: "follow"
        };

        fetch(API_URL + "ZonalHeadAreaInfo", requestOptions)
            .then((response) => response.json())
            .then((result) => handleSuccess(result))
            .catch((error) => handleError(error));
    };

    const handleSuccess = (resultData) => {
        alert("Zonal Head Area Info Added Successfully");
        navigate(`${process.env.PUBLIC_URL}/app/Zonal`, {
            state: resultData
        });
    };

    const handleError = (error) => {
        console.error("Error adding Zonal Head Area Info:", error);
        alert("There was an error. Please try again.");
    };

    return (
        <div className="container mt-5">
            <div className="card w-50 mx-auto">
                <div className="card-body">
                    <h5 className="card-title mb-4">Area Info</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Area Info"
                                value={areaInfo}
                                onChange={(e) => setAreaInfo(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ZHAreaInfo;
