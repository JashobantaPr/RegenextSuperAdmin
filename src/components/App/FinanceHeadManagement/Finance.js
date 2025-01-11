import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL, IMG_PATH } from "../../../server";

const Finance = () => {
    const [financeData, setFinanceData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    // Fetch finance data on component mount
    useEffect(() => {
        fetchFinanceData();
    }, []);

    // Fetch finance data from API
    const fetchFinanceData = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllfinanceHead", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    setAlertMessage(result.message);
                    setFinanceData(result.users);
                    setTimeout(() => setAlertMessage(''), 2000); // Clear alert after 2 seconds
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch(error => console.error(error));
    };

    // Navigate to Finance Head Registration page
    const financeRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/FinanceHeadRegistration`);
    };

    // Delete a finance head
    const deleteFinanceHead = (admin_id, FH_id) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ admin_id, FH_id });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteFHUser", requestOptions)
            .then(response => response.json())
            .then(() => fetchFinanceData()) // Refresh the data after deletion
            .catch(error => console.error(error));
    };

    // Pagination logic
    const displayUsers = financeData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map(item => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{item.pincode}</td>
                <td><img src={IMG_PATH + item.profile_img} style={{ width: 30, height: 30, borderRadius: 5 }} alt="Profile" /></td>
                <td><button className="btn btn-danger btn btn-sm" onClick={() => deleteFinanceHead(item.admin_id, item._id)}>Delete</button></td>
            </tr>
        ));

    const pageCount = Math.ceil(financeData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="finance-container">
            <div className="d-flex justify-content-end mt-4">
                <Button onClick={financeRegistration} className="btn btn-primary">
                    <i className="fe fe-plus me-2"></i>Finance Registration
                </Button>
            </div>

            {/* Finance Data Table */}
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

            {/* Pagination */}
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

            {/* Alert Message */}
            {alertMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default Finance;
