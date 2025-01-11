import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL, IMG_PATH } from "../../../server";

const Zonal = () => {
    const [zonalData, setZonalData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    // Fetch Zonal data
    useEffect(() => {
        fetchZonalData();
    }, []);

    const fetchZonalData = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(API_URL + "getAllZonal", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setZonalData(result.users);
            })
            .catch((error) => console.error("Error fetching zonal data: ", error));
    };

    // Handle Zonal Registration
    const handleZonalRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/ZonalHeadRegistration`);
    };

    // Handle Navigation to AreaInfo
    const navigateToAreaInfo = (id) => {
        navigate(`${process.env.PUBLIC_URL}/app/ZHAreaInfo`, { state: id });
    };

    // Handle deleting a Zonal Head
    const deleteZonalHead = (admin_id, zh_id) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ admin_id, zh_id });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteZHUser", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("deleteZHUser response", result);
                fetchZonalData(); // Refetch data after deletion
            })
            .catch((error) => console.error("Error deleting zonal head: ", error));
    };

    // Paginate the data
    const pageCount = Math.ceil(zonalData.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // Display users in the table
    const displayUsers = zonalData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map(({ _id, name, email, password, mobileNumber, phoneNumber, address, pincode, areaInfo, image, admin_id }) => (
            <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{mobileNumber}</td>
                <td>{phoneNumber}</td>
                <td>{address}</td>
                <td>{pincode}</td>
                <td>{areaInfo}</td>
                <td><img src={`${IMG_PATH}${image}`} alt="Zonal head" style={{ width: 30, height: 30, borderRadius: 5 }} /></td>
                <td>
                    <Button onClick={() => navigateToAreaInfo(_id)} className="ms-3 btn-sm">AreaInfo</Button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteZonalHead(admin_id, _id)}>Delete</button>
                </td>
            </tr>
        ));

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
                    onClick={handleZonalRegistration}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Zonal Registration
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
                        <th>Area Info</th>
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
        </div>
    );
};

export default Zonal;
