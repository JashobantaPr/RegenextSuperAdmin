import React, { useEffect, useState } from "react";
import { Alert, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './styles.css'
import { API_URL, IMG_PATH } from "../../../server";

const Stockist = () => {
    const [StockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
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

        fetch(API_URL + "getAllStockist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result is ", result);
                setStockistData(result.result);
            })
            .catch((error) => console.error(error));
    };
    const AddStockist = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddStockist`, {});
    };

    const deleterecord = (idid) =>{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "id": idid
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(API_URL+"deleteStockist", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert("Are You Sure.  You want to delete the stockiest ?")
          getStockist();
          console.log(result)
        })
        .catch((error) => console.error(error));
    }

    const displayUsers = StockistData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.stockist}</td>
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
                  <Button className="btn-sm btn btn-danger" onClick={()=>deleterecord(item._id)}>Delete</Button>
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
                    onClick={AddStockist}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2"></i>Add Stockist
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
                        <th>Action</th>
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

export default Stockist;
