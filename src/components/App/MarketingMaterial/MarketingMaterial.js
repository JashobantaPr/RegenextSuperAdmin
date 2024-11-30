import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap"; // Import Modal
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL, IMG_PATH } from "../../../server";

const MarketingMaterial = () => {
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

        fetch(API_URL + "getMarketingMaterial", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status == true){
                    console.log("result is ", result);
                    setStockistData(result.result1);
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

    const AddMarketingMaterial = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddMarketingMaterial`, {});
    };

    const navup = (idid) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateMarketingMaterial`, {
            state: idid
        })
    }



    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    }

    const displayUsers = StockistData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td><h5>{item.marketingMaterial}</h5></td>
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
                    onClick={AddMarketingMaterial}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2">Add MarketingMaterial</i>
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

export default MarketingMaterial;
