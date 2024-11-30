import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap"; // Import Modal
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './VisitType.css'
import { API_URL, IMG_PATH } from "../../../server";

const VisitType = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [StockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null); // State to track record to delete
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

        fetch(API_URL + "getAllVisitType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status == true){
                    console.log("result is ", result);
                    setStockistData(result.result);
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

    const CreateVisit = () => {
        navigate(`${process.env.PUBLIC_URL}/app/CreateVisit`, {});
    };

    const navup = (idid) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateVisit`, {
            state: idid
        })
    }

    const deleterecord = (idid) => {
        setRecordToDelete(idid); // Set the ID of the record to delete
        setShowModal(true); // Show the confirmation modal
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
                getStockist();
                console.log("result is", result)
            })
            .catch((error) => console.error(error));

        setShowModal(false); // Hide the modal after deletion
    }

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    }

    const displayUsers = StockistData?.slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td><h5>{item.visitType}</h5></td>
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
                <Button onClick={() => navup(item._id)} className="ms-3">Update</Button>
                <Button className="btn btn-danger btn" onClick={() => deleterecord(item._id)} style={{marginLeft: 7}}>Delete</Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(StockistData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={CreateVisit}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2">Add VisitType</i>
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
