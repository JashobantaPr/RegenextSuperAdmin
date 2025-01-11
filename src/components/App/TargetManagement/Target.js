import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./styles.css";

const Target = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [targetData, setTargetData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const personal = sessionStorage.getItem("personalid");
    const navigate = useNavigate();

    useEffect(() => {
        getTargetData();
    }, []);

    const getTargetData = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow",
        };

        fetch("http://45.198.13.8:6007/getFinanceTarget", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    console.log("API Result:", result);
                    setTargetData(result.data || []);
                    setAlertMessage("Data fetched successfully");
                    setTimeout(() => {
                        setAlertMessage("");
                    }, 2000);
                } else {
                    setAlertMessage("Error fetching data from the API");
                }
            })
            .catch((error) => console.error("Fetch Error:", error));
    };

    const AddInventory = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddTarget`);
    };

    const navup = (record) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateTarget`, { state: record });
    };

    const deleterecord = (idid) => {
        setRecordToDelete(idid);
        setShowModal(true);
    };

    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            admin_id: personal,
            financeTarget_id: recordToDelete,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://45.198.13.8:6007/deleteFinanceTarget", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("Delete Result:", result);
                getTargetData(); // Refresh data
            })
            .catch((error) => console.error("Delete Error:", error));

        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const displayUsers = targetData
        ?.slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id} className="table-row">
                <td>{item.Product}</td>
                <td>{item.Geography}</td>
                <td>{item.overallTargetVolume}</td>
                <td>{item.overallTargetValue}</td>
                <td>
                    <div className="monthly-targets">
                        {item.MonthlyTargets.map((target) => (
                            <div key={target._id} className="monthly-target">
                                <strong>{target.Month}:</strong> Volume: {target.TargetVolume}, Value: {target.TargetValue}
                            </div>
                        ))}
                    </div>
                </td>
                <td>
                    <Button variant="warning" onClick={() => navup(item)} className="ms-3">
                        Update
                    </Button>
                </td>
                <td>
                    <Button
                        variant="danger"
                        onClick={() => deleterecord(item._id)}
                        className="ms-3"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(targetData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-4">
                <Button
                    onClick={AddInventory}
                    variant="primary"
                    className="btn-custom"
                >
                    <i className="fe fe-plus me-2"></i>Add Target
                </Button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Product</th>
                            <th>Geography</th>
                            <th>Overall Volume</th>
                            <th>Overall Value</th>
                            <th>Monthly Targets</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{displayUsers}</tbody>
                </table>
            </div>

            <div className="pagination-container">
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
                />
            </div>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteConfirmed}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert Message */}
            {alertMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default Target;
