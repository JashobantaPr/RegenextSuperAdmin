import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

function ZHAreaInfo() {
    const [areaInfo, setareaInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location?.state._id;
    console.log("userId", userId);

    // const id = location?.state;
    // sessionStorage.setItem("everyid",id);
    const personal = sessionStorage.getItem("personalid");
    console.log("personal id",personal);
    // console.log("every id" , id);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!areaInfo) {
            alert("Please fill all required fields.");
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "user_id": userId,
            "areaInfo": [areaInfo],
            
        });
        // console.log("raw",raw);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "ZonalHeadAreaInfo", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("result is Zonal Head  Area Info Addition ",result)
            registration(result)
        })
        .catch((error) => console.error(error));
    }

    const registration = (resultdata) =>{
        alert("Zonal Head Area Info Added Successfully");
        navigate(`${process.env.PUBLIC_URL}/app/Zonal`,{
            state:resultdata
        })
    }

    return(
        <div className="container mt-5">
            <div className="card w-50 mx-auto">
                <div className="card-body">
                    <form >

                        <h5 className="card-title">Area Info</h5>
                        <div className="mb-3">
                            <input type="areaInfo" className="form-control" placeholder="Enter Area Info" value={areaInfo} onChange={(e) => setareaInfo(e.target.value)} required />
                        </div>
                        {/* <h5 className="card-title">Password</h5>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div> */}
                        {/* <h5 className="card-title">Token</h5>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Enter Token" value={token} onChange={(e) => setToken(e.target.value)} required />
                        </div> */}
                        <button onClick={(e)=>handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ZHAreaInfo;
