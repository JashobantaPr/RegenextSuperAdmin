import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap"; // Import Modal
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './VisitType.css'
import { API_URL, IMG_PATH } from "../../../server";

const VisitType = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [pData, setpData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null); // State to track record to delete
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

        fetch(API_URL + "getAllVisitType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status == true){
                    console.log("result is ", result);
                    setpData(result.VisitType);
                    setAlertMessage(result.message);
                    // Clear the alert after 3 seconds
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                }
                else{
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const addproduct = () => {
        navigate(`${process.env.PUBLIC_URL}/app/CreateVisit`, {});
    };

    const navup = (idid) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateVisit`, {
            state: idid
        })
    }

    const deleterecord = (idid) => {
        setRecordToDelete(idid);
        setShowModal(true);
    }

    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "visit_id": recordToDelete
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch(API_URL + "deleteVisitType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getp();
                console.log("result is", result)
            })
            .catch((error) => console.error(error));
        setShowModal(false); // Hide the modal after deletion
    }

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    }

    const displayUsers = pData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.Privacy}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <Button onClick={() => deleterecord(item._id)}>Delete</Button>
                    <Button onClick={() => navup(item._id)} className="ms-3">Update</Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(pData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "750px" }}
                    onClick={addproduct}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add Privacy Management
                </Button>
            </div>
            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th style={{ marginLeft: "10px" }}>Action</th>
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
                    <Button variant="primary" onClick={deleteConfirmed}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

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

export default VisitType;
