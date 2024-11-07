import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL, IMG_PATH } from "../../../server";

const Sales = () => {
    const [SalesData, setSalesData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
      getSales();
    }, []);

    const getSales = () => {
      const raw = "";

      const requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow"
      };
      
      fetch(API_URL+"getAllSales", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          setSalesData(result.users)
        })
        .catch((error) => console.error(error));
    };

    const SalesRegistration = () => {
        navigate(`${process.env.PUBLIC_URL}/app/SalesHeadRegistration`, {});
    };

    const displayUsers = SalesData
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

    const pageCount = Math.ceil(SalesData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={SalesRegistration}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Sales Registration
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
        </div>
    );
};

export default Sales;
