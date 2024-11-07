import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_PATH } from "../../../server";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [unapprovedDoctors, setUnapprovedDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [approvedCurrentPage, setApprovedCurrentPage] = useState(1); // Separate state for approved doctors pagination
  const [unapprovedCurrentPage, setUnapprovedCurrentPage] = useState(1); // Separate state for unapproved doctors pagination
  const [doctorsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors();
  }, [approvedCurrentPage, unapprovedCurrentPage]); // Update doctors when currentPage changes

  const getDoctors = () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow"
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

  const approve = (idid) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      doctor_id: idid
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL + "adminApprove", requestOptions)
      .then((response) => response.json())
      .then((result) => {   
        setShowModal(true);
        getDoctors();
        setSuccessMessage("Approval was successful");
      })
      .catch((error) => console.error(error));
  };

  // Pagination for approved doctors
  const indexOfLastApprovedDoctor = approvedCurrentPage * doctorsPerPage;
  const indexOfFirstApprovedDoctor = indexOfLastApprovedDoctor - doctorsPerPage;
  const currentApprovedDoctors = approvedDoctors.slice(indexOfFirstApprovedDoctor, indexOfLastApprovedDoctor);

  const paginateApproved = (pageNumber) => setApprovedCurrentPage(pageNumber);

  // Pagination for unapproved doctors
  const indexOfLastUnapprovedDoctor = unapprovedCurrentPage * doctorsPerPage;
  const indexOfFirstUnapprovedDoctor = indexOfLastUnapprovedDoctor - doctorsPerPage;
  const currentUnapprovedDoctors = unapprovedDoctors.slice(indexOfFirstUnapprovedDoctor, indexOfLastUnapprovedDoctor);

  const paginateUnapproved = (pageNumber) => setUnapprovedCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

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
                <th>Visit Type</th>
                <th>Image</th>
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
                  <td>{doctor.visitType}</td>
                  <td><img src={IMG_PATH + doctor.image} style={{ width: 30, height: 30, borderRadius: 5 }} /></td>
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
                <th>Visit Type</th>
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
                  <td>{doctor.visitType}</td>
                  <td><img src={IMG_PATH + doctor.image} style={{ width: 30, height: 30, borderRadius: 5 }} /></td>
                  <td>
                    <Button onClick={() => approve(doctor._id)} style={{ backgroundColor: "#05EBD5", color: "#00000" }}>
                      Approve
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
    </div>
  );
};

export default Doctor;
