import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { API_URL } from "../../../server";

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
        const requestOptions = {
            method: "POST",
            body: new FormData(),
            redirect: "follow",
        };

        fetch(API_URL + "getAllStockist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setStockistData(result.result);
            })
            .catch((error) => console.error(error));
    };

    const AddStockist = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddStockist`);
    };

    const UpdateStockist = (stockist) => {
        console.log("Navigating with stockist:", stockist); // Debug
        navigate(`${process.env.PUBLIC_URL}/app/UpdateStockist`, { state: { stockistData: stockist } });
    };

    const deleterecord = (idid) => {
        if (window.confirm("Are you sure you want to delete this stockist?")) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ id: idid });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(API_URL + "deleteStockist", requestOptions)
                .then((response) => response.json())
                .then(() => {
                    getStockist();
                })
                .catch((error) => console.error(error));
        }
    };

    const displayUsers = StockistData.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => (
        <tr key={item._id}>
            <td>{item.stockist}</td>
            <td>{item.contanctNumber}</td>
            <td>{item.address}</td>
            <td>{item.stockistStatus}</td>
            <td className="text-end">
                <Button
                    className="btn-sm btn-primary me-2"
                    onClick={() => UpdateStockist(item)}
                >
                    Update
                </Button>
                <Button
                    className="btn-sm btn-danger"
                    onClick={() => deleterecord(item._id)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    ));

    const pageCount = Math.ceil(StockistData.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-4">
            <Row>
                <Col className="text-end">
                    <Button onClick={AddStockist} className="btn btn-primary">
                        <i className="fe fe-plus me-2"></i>Add Stockist
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Name</th>
                        <th style={{ color: "black" }}>Contact Number</th>
                        <th style={{ color: "black" }}>Address</th>
                        <th style={{ color: "black" }}>Status</th>
                        <th style={{ color: "black", textAlign: "end" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>{displayUsers}</tbody>
            </Table>

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
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
            />
        </div>
    );
};

export default Stockist;
