import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL, IMG_PATH } from "../../../server";

const Privacy = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [pData, setpData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        getp();
    }, []);

    const getp = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllPrivacy", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setpData(result.Privacy);
                    setAlertMessage(result.message);
                    setTimeout(() => setAlertMessage(''), 2000); // Clear alert after 3 seconds
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const addProduct = () => {
        navigate(`${process.env.PUBLIC_URL}/app/CreatePrivacy`);
    };

    const navUp = (id) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdatePrivacy`, { state: id });
    };

    const deleteRecord = (id) => {
        setRecordToDelete(id);
        setShowModal(true);
    };

    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ "privacy_id": recordToDelete });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteprivacy", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getp();
                console.log("result is", result);
            })
            .catch((error) => console.error(error));

        setShowModal(false);
    };

    const handleCloseModal = () => setShowModal(false);

    const displayUsers = pData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.Privacy}</td>
                <td>
                    <Button onClick={() => deleteRecord(item._id)}>Delete</Button>
                    <Button onClick={() => navUp(item._id)} className="ms-3">Update</Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(pData.length / usersPerPage);

    const changePage = ({ selected }) => setPageNumber(selected);

    return (
        <div>
            {/* Add Privacy Button */}
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "750px" }}
                    onClick={addProduct}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add Privacy Management
                </Button>
            </div>

            {/* Privacy Table */}
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th style={{ marginLeft: "10px" }}>Action</th>
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
                containerClassName={"pagination justify-content-center"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"page-item disabled"}
                activeClassName={"page-item active"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={deleteConfirmed}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Alert Message */}
            {alertMessage && (
                <Alert variant="success" className="mt-3" onClose={() => setAlertMessage('')} dismissible>
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
};

export default Privacy;
