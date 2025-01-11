import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css';
import { API_URL } from "../../../server";

const Products = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [StockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    // Fetch product data on component mount
    useEffect(() => {
        getStockist();
    }, []);

    // Get the stockist data from API
    const getStockist = () => {
        const requestOptions = {
            method: "POST",
            body: new FormData(),
            redirect: "follow"
        };

        fetch(API_URL + "getAllProductType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setStockistData(result.result1);
                    setAlertMessage(result.message);
                    setTimeout(() => setAlertMessage(''), 2000); // Clear alert after 2 seconds
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    // Navigate to Add Product page
    const addProduct = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddProduct`);
    };

    // Navigate to Update Product page
    const navUp = (id) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateProduct`, { state: id });
    };

    // Set the record to delete and show confirmation modal
    const deleteRecord = (id) => {
        setRecordToDelete(id);
        setShowModal(true);
    };

    // Confirm the deletion of a product
    const deleteConfirmed = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ product_id: recordToDelete });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL + "deleteProductType", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getStockist();
                setShowModal(false); // Close the modal after deletion
            })
            .catch((error) => console.error(error));
    };

    // Close the modal without deleting
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Handle pagination
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // Display paginated stockist data
    const displayProducts = StockistData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td><h5>{item.productType}</h5></td>
                <td>
                    <Button onClick={() => navUp(item._id)} className="ms-3">Update</Button>
                    <Button onClick={() => deleteRecord(item._id)} variant="danger" className="ms-3">Delete</Button>
                </td>
            </tr>
        ));

    // Calculate the total number of pages
    const pageCount = Math.ceil(StockistData.length / usersPerPage);

    return (
        <div>
            {/* Add Product Button */}
            <div className="text-end mt-4">
                <Button onClick={addProduct} className="btn btn-primary">
                    <i className="fe fe-plus me-2"></i>Add Product
                </Button>
            </div>

            {/* Table to Display Products */}
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayProducts}
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
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={deleteConfirmed}>Delete</Button>
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

export default Products;
