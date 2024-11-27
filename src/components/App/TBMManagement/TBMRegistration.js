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
    const [selectedZonalHead, setselectedZonalHead] = useState('');
    const [abm, setABM] = useState([]);
    const [selectedABM, setselectedABM] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const personal = sessionStorage.getItem("personalid");
    console.log("personal id", personal);


    useEffect(() => {
        getZonalHead();
    },[]);  

    const getZonalHead = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
          };
          
          fetch(API_URL+"getAllZonal", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if(result.status == true){
                    setZonalHead(result.users)
                }
            })
            .catch((error) => console.error(error));

    }


    useEffect(() =>{
        getABM();
    },[]);

    const getABM = () =>{
        const requestOptions = {
            method: "POST",
            redirect: "follow"
          };
          
          fetch(API_URL+"getAllABM", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status == true) {
                    setABM(result.users)
                }
            })
            .catch((error) => console.error(error));
    }

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
                        <h5 className="card-title">Zonal Head</h5>
                        <div className="mb-3">
                           { /*<input type="" className="form-control" placeholder="Select Zonal Head" value={email} onChange={(e) => setEmail(e.target.value)} required />*/}
                            <select
          className="form-control"
          value={selectedZonalHead}
          onChange={(e)=>{
            console.log('fgh', e.target.value)
            setselectedZonalHead(e.target.value)
        }}
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
                        <h5 className="card-title">ABM</h5>
                        <div className="mb-3">
                           { /*<input type="" className="form-control" placeholder="Select Zonal Head" value={email} onChange={(e) => setEmail(e.target.value)} required />*/}
                            <select
          className="form-control"
          value={selectedABM}
          onChange={(e)=>{
            console.log('aasd', e.target.value)
            setselectedABM(e.target.value)
        }}
          required
        >
          <option value="" disabled>
            Select ABM
          </option>
          {abm.map((abm) => (
            <option key={abm._id} value={abm._id}>
              {abm.name}
            </option>
          ))}
        </select>
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
