import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Import Modal
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL } from "../../../server";

const Target = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [StockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null); // State to track record to delete
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const personal = sessionStorage.getItem("personalid");
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

        fetch(API_URL + "getFinanceTarget", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status === true){
                    console.log("result is ", result);
                    setStockistData(result.result1 || []);
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

    const AddInventory = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddTarget`, {});
    };

    const navup = (idid) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateTarget`, {
            state: idid
        })
    }

    const deleterecord = (idid) => {
        setRecordToDelete(idid); // Set the ID of the record to delete
        console.log("idid", idid);
        setShowModal(true); // Show the confirmation modal
    }

    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "financeTarget_id": recordToDelete
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch(API_URL + "deleteFinanceTarget", requestOptions)
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
                <td><h6>{item.monthVolume}</h6></td>
                <td><h6>{item.monthValue}</h6></td>
                <td><h6>{item.yearVolume}</h6></td>
                <td><h6>{item.yearValue}</h6></td>
                <td>
                <Button onClick={() => navup(item)} className="ms-3">Update</Button>
                </td>
                <td>
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
                    onClick={AddInventory}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add Target
                </Button>
            </div>
            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th><h5>Monthly Target</h5></th>
                        <th></th>
                        <th><h5>Yearly Target</h5></th>
                        <th></th>
                        <th></th>
                        <th style={{marginLeft: "40px"}}>Action</th>
                    </tr>
                    <tr>
                        <th><h6>Volume</h6></th>
                        <th><h6>Value</h6></th>
                        <th><h6>Volume</h6></th>
                        <th><h6>Value</h6></th>
                        <th></th>
                        <th ></th>
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

export default Target;
