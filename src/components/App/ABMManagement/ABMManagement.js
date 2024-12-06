import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL, IMG_PATH } from "../../../server";

const ABMManagement = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [abmData, setABMData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        getabmUsers();
    }, []);

    const getabmUsers = () => {
        const raw = "";

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "getAllABM", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    console.log("result is ", result);
                    setAlertMessage(result.message);
                    setABMData(result.users);
                    // Clear the alert after 3 seconds
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                }
                else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const ABMRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/ABMRegistration`, {});
    };
    const navup = (idid) => {
        navigate(`${process.env.PUBLIC_URL}/app/AreaInfo`, {
            state: idid
        })
    }

    const deleteABM = (admin_id, abm_id) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": admin_id,
            "abm_id": abm_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteABMUser", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("deleteABMUser", result);
                getabmUsers()
            })
            .catch((error) => console.error(error));
    }

    const displayUsers = abmData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.name}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{item.pincode}</td>
                <td>{item.areaInfo}</td>
                <td><img src={IMG_PATH + item.image} style={{ width: 30, height: 30, borderRadius: 5 }} /></td>
                <td><Button onClick={() => navup(item)} className="ms-3 btn-sm">AreaInfo</Button></td>
                <td><button className="btn btn-danger btn btn-sm" onClick={() => deleteABM(item.admin_id, item._id)}>Delete</button></td>
            </tr>
        ));

    const pageCount = Math.ceil(abmData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={ABMRegistration}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>ABM Registration
                </Button>
            </div>
            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>areaInfo</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination justify-content-center"} // Center pagination
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"page-item disabled"}
                activeClassName={"page-item active"}
                breakClassName={"page-item"} // Class for break elements (...)
                breakLinkClassName={"page-link"}
            />

            <div>
                {/* Display alert if alertMessage is not empty */}
                {alertMessage && (
                    <div className="alert alert-success" role="alert">
                        {alertMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ABMManagement;
