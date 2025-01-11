import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL } from "../../../server";

const HelpAndSupport = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [hasData, setHasData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null); // Record to delete
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        fetchHelpAndSupportData(); // Fetch data when component mounts
    }, []);

    const fetchHelpAndSupportData = () => {
        const requestOptions = {
            method: "POST",
            body: new FormData(), // Body for fetching data
            redirect: "follow"
        };

        fetch(`${API_URL}getAllHelpAndSupport`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status) {
                    setHasData(result.HelpAndSupportdata);
                    setAlertMessage(result.message);
                    clearAlertMessage(); // Clear alert message after 2 seconds
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const clearAlertMessage = () => {
        setTimeout(() => setAlertMessage(''), 2000);
    };

    const handleAddProduct = () => {
        navigate(`${process.env.PUBLIC_URL}/app/CreateHelpAndSupport`);
    };

    const handleUpdate = (id) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateHelpAndSupport`, { state: id });
    };

    const handleDelete = (id) => {
        setRecordToDelete(id); // Set the ID of the record to delete
        setShowModal(true); // Show confirmation modal
    };

    const deleteConfirmed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: recordToDelete }),
            redirect: "follow"
        };

        fetch(`${API_URL}deleteHelpAndSupport`, requestOptions)
            .then((response) => response.json())
            .then(() => {
                fetchHelpAndSupportData(); // Refresh data after deletion
                setShowModal(false); // Close modal
            })
            .catch((error) => console.error(error));
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    const displayData = hasData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.HelpAndSupport}</td>
                <td>
                    <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                    <Button onClick={() => handleUpdate(item._id)} className="ms-3">Update</Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(hasData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected); // Change page
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "750px" }}
                    onClick={handleAddProduct}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add HelpAndSupport
                </Button>
            </div>

            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th>Help And Support</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>{displayData}</tbody>
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

            {/* Modal for delete confirmation */}
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

            {/* Alert message */}
            {alertMessage && (
                <Alert variant="success" dismissible onClose={() => setAlertMessage('')}>
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
};

export default HelpAndSupport;
