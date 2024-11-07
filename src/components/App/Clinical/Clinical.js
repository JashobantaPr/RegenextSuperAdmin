import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL, IMG_PATH } from "../../../server";

const Clinical = () => {
    const [clinicalData, setclinicalData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        getclinical();
    }, []);

    const getclinical = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(API_URL + "getAllClinical", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status == true){
                    console.log("result is ", result);
                    setAlertMessage(result.message);
                    setclinicalData(result.users);
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

    const ClinicalRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/ClinicalRegistration`, {});
    };

    const displayUsers = clinicalData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{item.pincode}</td>
                <td><img src={IMG_PATH + item.profile_img} style={{ width: 30, height: 30, borderRadius: 5 }} /></td>
            </tr>
        ));

    const pageCount = Math.ceil(clinicalData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={ClinicalRegistration}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Clinic Registration
                </Button>
            </div>
            <table className="table table-striped" style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>Image</th>
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

export default Clinical;
