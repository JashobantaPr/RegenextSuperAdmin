import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL } from "../../../server";

const Inventory = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [stockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    // Fetch stockist data
    useEffect(() => {
        getStockist();
    }, []);

    const getStockist = async () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow",
        };

        try {
            const response = await fetch(API_URL + "getOpeningStock", requestOptions);
            const result = await response.json();
            if (result.status) {
                setStockistData(result.data || []);
                setAlertMessage(result.message);
                setTimeout(() => setAlertMessage(''), 2000);
            } else {
                setAlertMessage("Error fetching data from the API");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const AddOpeningStock = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddOpeningStock`);
    };

    const navup = (item) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateOpeningStock`, { state: item });
    };

    const deleterecord = (id) => {
        setRecordToDelete(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setRecordToDelete(null);
    };

    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "openingStock_id": recordToDelete,
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
    
        fetch(API_URL + "deleteOpeningStock", requestOptions)
            .then((response) => response.json()) // Parse response as JSON
            .then((result) => {
                console.log("API Response:", result); // Log the response from the API
    
                if (result.status) {
                    setStockistData((prevData) =>
                        prevData.filter((item) => item._id !== recordToDelete)
                    );
                    setAlertMessage(result.message || "Record deleted successfully");
                    setTimeout(() => setAlertMessage(""), 2000);
                    getStockist();
                } else {
                    setAlertMessage(result.message || "Failed to delete record");
                    setTimeout(() => setAlertMessage(""), 2000);
                    getStockist();
                }
            })
            .catch((error) => {
                console.error("Error during deletion:", error); // Log any errors that occur during the fetch
                setAlertMessage("Failed to delete record due to an error");
                setTimeout(() => setAlertMessage(""), 2000);
                getStockist();
            })
            .finally(() => {
                setShowModal(false); // Close modal in all cases
                setRecordToDelete(null);
                getStockist();
            });
    };
    

    const displayUsers = stockistData
        ?.slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td><h6>{item.stockistDetails?.stockist || "N/A"}</h6></td>
                <td><h6>{item.productDetails?.productType || "N/A"}</h6></td>
                <td><h6>{item.openingStock}</h6></td>
                <td><h6>{item.openingStockValue}</h6></td>
                <td>
                    <Button onClick={() => navup(item)} className="ms-3">Update</Button>
                </td>
                <td>
                    <Button className="btn btn-danger btn" onClick={() => deleterecord(item._id)} style={{ marginLeft: 7 }}>Delete</Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(stockistData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mt-4">
                <Button
                    onClick={AddOpeningStock}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add Opening Stock
                </Button>
            </div>
            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th><h5>Stockist Name</h5></th>
                        <th><h5>Product Name</h5></th>
                        <th><h5>Opening Stock</h5></th>
                        <th><h5>Opening Stock Value</h5></th>
                        <th><h5>Action</h5></th>
                        <th><h5>Delete</h5></th>
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

            {alertMessage && (
                <Alert className="mt-3" variant="success">
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
};

export default Inventory;


////
