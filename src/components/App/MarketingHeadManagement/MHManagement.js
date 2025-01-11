import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL, IMG_PATH } from "../../../server";

const MHManagement = () => {
    const [mhData, setmhData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        getmhUsers();
    }, []);

    const getmhUsers = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllMH", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setAlertMessage(result.message);
                    setmhData(result.users);
                    // Clear alert after 3 seconds
                    setTimeout(() => setAlertMessage(''), 3000);
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    // Navigate to MH Registration page
    const mhRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/MHRegistration`);
    };

    // Delete Marketing Handler
    const deleteMH = (admin_id, MH_id) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ admin_id, MH_id }),
            redirect: "follow"
        };

        fetch(API_URL + "deleteMHUser", requestOptions)
            .then((response) => response.json())
            .then(() => {
                getmhUsers();
            })
            .catch((error) => console.error(error));
    };

    // Display data in the table
    const displayUsers = mhData
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
                        src={IMG_PATH + item.profile_img}
                        alt="Profile"
                        style={{ width: 30, height: 30, borderRadius: 5 }}
                    />
                </td>
                <td>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteMH(item.admin_id, item._id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

    // Pagination
    const pageCount = Math.ceil(mhData.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-4">
            {/* Add Marketing Registration Button */}
            <div className="d-flex justify-content-end mb-3">
                <Button onClick={mhRegistration} className="btn btn-primary">
                    <i className="fe fe-plus me-2"></i>Marketing Registration
                </Button>
            </div>

            {/* Data Table */}
            <table className="table table-striped">
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
                <tbody>{displayUsers}</tbody>
            </table>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="pagination justify-content-center"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                disabledClassName="page-item disabled"
                activeClassName="page-item active"
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />

            {/* Alert Message */}
            {alertMessage && (
                <Alert variant="success" dismissible>
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
};

export default MHManagement;
