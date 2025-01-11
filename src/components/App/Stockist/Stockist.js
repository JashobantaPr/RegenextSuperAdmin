import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { API_URL } from "../../../server";
import "./styles.css";

const Stockist = () => {
    const [stockistData, setStockistData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const navigate = useNavigate();

    useEffect(() => {
        fetchStockistData();
    }, []);

    const fetchStockistData = () => {
        const requestOptions = {
            method: "POST",
            body: new FormData(),
            redirect: "follow",
        };

        fetch(API_URL + "getAllStockist", requestOptions)
            .then((response) => response.json())
            .then((result) => setStockistData(result.result))
            .catch((error) => console.error("Error fetching stockists:", error));
    };

    const handleAddStockist = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddStockist`);
    };

    const handleUpdateStockist = (stockist) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateStockist`, { state: { stockistData: stockist } });
    };

    const handleDeleteStockist = (id) => {
        if (window.confirm("Are you sure you want to delete this stockist?")) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ id });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(API_URL + "deleteStockist", requestOptions)
                .then((response) => response.json())
                .then(() => fetchStockistData())
                .catch((error) => console.error("Error deleting stockist:", error));
        }
    };

    const displayedStockists = stockistData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => (
            <tr key={item._id}>
                <td>{item.stockist}</td>
                <td>{item.contanctNumber}</td>
                <td>{item.address}</td>
                <td>{item.stockistStatus}</td>
                <td className="text-end">
                    <Button
                        className="btn-sm btn-primary me-2"
                        onClick={() => handleUpdateStockist(item)}
                    >
                        Update
                    </Button>
                    <Button
                        className="btn-sm btn-danger"
                        onClick={() => handleDeleteStockist(item._id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(stockistData.length / usersPerPage);

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-4">
            <Row>
                <Col className="text-end">
                    <Button onClick={handleAddStockist} className="btn btn-primary">
                        <i className="fe fe-plus me-2"></i> Add Stockist
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>{displayedStockists}</tbody>
            </Table>

            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
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
