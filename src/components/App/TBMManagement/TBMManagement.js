import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL, IMG_PATH } from "../../../server";

const TBMManagement = () => {
    const [tbmData, setTbmData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        getTbmUsers();
    }, []);

    const getTbmUsers = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllTBM", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setAlertMessage(result.message);
                    setTbmData(result.users);
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const TBMRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/TBMRegistration`);
    };

    const deleteTBM = (admin_id, tbm_id) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            admin_id,
            tbm_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteTBMUser", requestOptions)
            .then((response) => response.json())
            .then(() => {
                getTbmUsers();
            })
            .catch((error) => console.error(error));
    };

    const displayUsers = tbmData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{item.pincode}</td>
                <td>
                    <img
                        src={IMG_PATH + item.image}
                        alt="user"
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 5
                        }}
                    />
                </td>
                <td>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTBM(item.admin_id, item._id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(tbmData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={TBMRegistration}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i> TBM Registration
                </Button>
            </div>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Mobile Number</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Pincode</th>
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
                containerClassName={"pagination justify-content-center"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"page-item disabled"}
                activeClassName={"page-item active"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />

            {/* Display Alert Message */}
            {alertMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default TBMManagement;
