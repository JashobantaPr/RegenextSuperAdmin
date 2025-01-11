import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { API_URL } from "../../../server";
import './styles.css';

const TremsAndConditions = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [tacData, setTacData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [recordToDelete, setRecordToDelete] = useState(null); // State to track record to delete
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const navigate = useNavigate();

  // Fetch Terms and Conditions data on component mount
  useEffect(() => {
    getTac();
  }, []);

  // Fetch Terms and Conditions data from the API
  const getTac = () => {
    const formData = new FormData();
    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };

    fetch(API_URL + "getAllTerms", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setTacData(result.termsdata);
          setAlertMessage(result.message);
          // Clear the alert after 3 seconds
          setTimeout(() => setAlertMessage(''), 2000);
        } else {
          setAlertMessage('Error fetching data from the API');
        }
      })
      .catch(error => console.error(error));
  };

  // Navigate to Add Terms and Conditions page
  const addProduct = () => {
    navigate(`${process.env.PUBLIC_URL}/app/CreateTermsAndConditions`);
  };

  // Navigate to Update Terms and Conditions page
  const navUp = (id) => {
    navigate(`${process.env.PUBLIC_URL}/app/UpdateTermsAndConditions`, { state: id });
  };

  // Trigger delete confirmation modal
  const deleteRecord = (id) => {
    setRecordToDelete(id);
    setShowModal(true);
  };

  // Handle record deletion
  const deleteConfirmed = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "id": recordToDelete });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL + "deleteTerms", requestOptions)
      .then(response => response.json())
      .then(() => {
        getTac(); // Refresh data after deletion
      })
      .catch(error => console.error(error));

    setShowModal(false);
  };

  // Handle closing the confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination logic
  const displayUsers = tacData
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => (
      <tr key={item._id}>
        <td>{item.Terms}</td>
        <td>
          <Button onClick={() => deleteRecord(item._id)}>Delete</Button>
          <Button onClick={() => navUp(item._id)} className="ms-3">Update</Button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(tacData.length / usersPerPage);

  // Change page handler
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="left-content mt-4">
        <Button
          style={{ marginLeft: "750px" }}
          onClick={addProduct}
          className="btn ripple btn-primary"
        >
          <i className="fe fe-plus me-2"></i>Add Terms And Conditions
        </Button>
      </div>

      {/* Table displaying Terms and Conditions */}
      <table className="table table-striped" style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th>Terms and Conditions</th>
            <th style={{ marginLeft: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers}
        </tbody>
      </table>

      {/* Pagination Component */}
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
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={deleteConfirmed}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Alert message */}
      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default TremsAndConditions;
