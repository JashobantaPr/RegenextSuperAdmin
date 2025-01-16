import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL } from "../../../server";

const GSTManagement = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [stockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const personal = sessionStorage.getItem("personalid");
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        getStockist();
    }, []);

    const getStockist = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllGST", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setStockistData(result.users || []);
                    setAlertMessage(result.message);
                    setTimeout(() => setAlertMessage(''), 2000);
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleAddGST = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddGST`);
    };

    const handleUpdateGST = (id) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateGST`, { state: id });
    };

    const handleDeleteRecord = (id) => {
        setRecordToDelete(id);
        setShowModal(true);
    };

    const handleDeleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "gst_id": recordToDelete
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteGST", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getStockist();
                console.log("result is", result);
            })
            .catch((error) => console.error(error));

        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const displayedStockists = stockistData.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => (
        <tr key={item._id}>
            <td><h5>{item.gstRate}</h5></td>
            <td>
                <Button onClick={() => handleUpdateGST(item._id)} className="ms-3">
                    Update
                </Button>
                <Button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteRecord(item._id)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    ));

    const pageCount = Math.ceil(stockistData.length / usersPerPage);

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={handleAddGST}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add GST
                </Button>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>GST Rate in %</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedStockists}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
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
                <Modal.Body>Are you sure you want to delete the record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDeleteConfirmed}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Display alert if alertMessage is not empty */}
            {alertMessage && (
                <div className="alert alert-success" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default GSTManagement;
