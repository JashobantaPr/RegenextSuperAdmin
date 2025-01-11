import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_PATH } from "../../../server";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [unapprovedDoctors, setUnapprovedDoctors] = useState([]);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [approvedCurrentPage, setApprovedCurrentPage] = useState(1); 
  const [unapprovedCurrentPage, setUnapprovedCurrentPage] = useState(1); 
  const [doctorsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors();
  }, [approvedCurrentPage, unapprovedCurrentPage]); 

  const getDoctors = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(API_URL + "getAllDoctor", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const approved = result.result.filter((doctor) => doctor.adminApprove === true);
        const unapproved = result.result.filter((doctor) => doctor.adminApprove === false);
        setDoctors(result.result);
        setApprovedDoctors(approved);
        setUnapprovedDoctors(unapproved);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const approveDoctor = (idid) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      doctor_id: idid,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "adminApprove", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getDoctors();
        setSuccessMessage("Approval was successful");
      })
      .catch((error) => console.error(error));
  };

  const deleteDoctor = (idid) => {
    setRecordToDelete(idid);
    setShowModal(true);
  };

  const deleteConfirmed = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      doctor_id: recordToDelete,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL + "deleteDoctor", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getDoctors();
        setShowModal(false); 
      })
      .catch((error) => console.error(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination logic
  const paginateDoctors = (doctorsList, currentPage, setCurrentPage) => {
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctorsList.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return {
      currentDoctors,
      paginate,
    };
  };

  const { currentDoctors: currentApprovedDoctors, paginate: paginateApproved } = paginateDoctors(approvedDoctors, approvedCurrentPage, setApprovedCurrentPage);
  const { currentDoctors: currentUnapprovedDoctors, paginate: paginateUnapproved } = paginateDoctors(unapprovedDoctors, unapprovedCurrentPage, setUnapprovedCurrentPage);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Success Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Approved Doctors Table */}
          <h3 style={{ marginTop: "40px", marginBottom: "20px", color: "#05EBD5" }}>Approved Doctors</h3>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Contact Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Mobile Number</th>
                <th>Doctor Type</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentApprovedDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.doctorName}</td>
                  <td>{doctor.contactName}</td>
                  <td>{doctor.email_id}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.pincode}</td>
                  <td>{doctor.mobileNumber}</td>
                  <td>{doctor.doctorType}</td>
                  <td>
                    <img src={IMG_PATH + doctor.image} style={{ width: 30, height: 30, borderRadius: 5 }} alt="Doctor" />
                  </td>
                  <td>
                    <Button className="btn btn-danger" onClick={() => deleteDoctor(doctor._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {Array.from({ length: Math.ceil(approvedDoctors.length / doctorsPerPage) }, (_, i) => (
              <Pagination.Item key={i} active={i + 1 === approvedCurrentPage} onClick={() => paginateApproved(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {/* Unapproved Doctors Table */}
          <h3 style={{ marginTop: "40px", marginBottom: "20px", color: "#05EBD5" }}>Unapproved Doctors</h3>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Contact Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Mobile Number</th>
                <th>Doctor Type</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUnapprovedDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.doctorName}</td>
                  <td>{doctor.contactName}</td>
                  <td>{doctor.email_id}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.pincode}</td>
                  <td>{doctor.mobileNumber}</td>
                  <td>{doctor.doctorType}</td>
                  <td>
                    <img src={IMG_PATH + doctor.image} style={{ width: 30, height: 30, borderRadius: 5 }} alt="Doctor" />
                  </td>
                  <td>
                    <Button onClick={() => approveDoctor(doctor._id)} style={{ backgroundColor: "#05EBD5", color: "#000" }}>
                      Approve
                    </Button>
                  </td>
                  <td>
                    <Button className="btn btn-danger" onClick={() => deleteDoctor(doctor._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {Array.from({ length: Math.ceil(unapprovedDoctors.length / doctorsPerPage) }, (_, i) => (
              <Pagination.Item key={i} active={i + 1 === unapprovedCurrentPage} onClick={() => paginateUnapproved(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Doctor;
