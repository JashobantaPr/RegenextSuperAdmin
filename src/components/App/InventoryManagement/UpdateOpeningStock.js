import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateInventory = () => {
    const location = useLocation();
    const iddata = location?.state;
    console.log("Received data:", iddata);

    const [alertMessage, setAlertMessage] = useState('');
    const [ProductName, setProductName] = useState('');
    const [selectedStockist, setSelectedStockist] = useState('');
    const [openingStock, setOpeningStock] = useState(iddata?.openingStock || '');
    const [openingStockValue, setOpeningStockValue] = useState(iddata?.openingStockValue || '');
    const [productTypes, setProductTypes] = useState([]);
    const [stockists, setStockists] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const response = await fetch(API_URL + "getAllProductType", { method: "POST" });
                const data = await response.json();
                if (data.status && Array.isArray(data.result1)) {
                    setProductTypes(data.result1);
                    const matchedProduct = data.result1.find(item => item._id === iddata?.product_id);
                    if (matchedProduct) setProductName(matchedProduct.productType);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching product types:", error);
            }
        };

        fetchProductTypes();
    }, [iddata?.product_id]);

    useEffect(() => {
        const fetchStockists = async () => {
            try {
                const response = await fetch(API_URL + "getAllStockist", { method: "POST" });
                const data = await response.json();
                if (data.status && Array.isArray(data.result)) {
                    setStockists(data.result);
                    const matchedStockist = data.result.find(item => item._id === iddata?.stockist_id);
                    if (matchedStockist) setSelectedStockist(matchedStockist.stockist);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching stockists:", error);
            }
        };

        fetchStockists();
    }, [iddata?.stockist_id]);

    useEffect(() => {
        if (showModal) setAlertMessage('');
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ProductName || !selectedStockist || !openingStock || !openingStockValue) {
            setAlertMessage("Please Fill All The Fields");
            console.log("Validation failed. Missing fields:");
            console.log({ ProductName, selectedStockist, openingStock, openingStockValue });
            return;
        }

        updateProduct();
    };

    const updateProduct = () => {
        const requestBody = {
            openingStock_id: iddata?._id,
            stockist_id: iddata.stockist_id,
            product_id: iddata.product_id,
            openingStock,
            openingStockValue,
        };

        // Log the request body to inspect the data
        console.log("Request Body:", requestBody);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(requestBody);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(API_URL+"updateOpeningStock", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("API Response:", result);  // Log the response from the API
                if (result.Status === true) {
                    console.log("Update successful:", result);
                    setShowModal(true);
                    
                } else {
                    setAlertMessage("Failed to update stock.");
                }
            })
            .catch(error => {
                console.error("Error updating inventory:", error);
                setAlertMessage("Error updating stock.");
            });
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <div style={{ marginBottom: '20px' }}>
                <h5>Update Opening Stock</h5>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="stockist">
                    <Form.Label>Update Stockist</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedStockist}
                        onChange={(e) => setSelectedStockist(e.target.value)}
                    >
                        <option value="" disabled>Select Stockist</option>
                        {stockists.map((stockist, index) => (
                            <option key={index} value={stockist.stockist}>{stockist.stockist}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="productType">
                    <Form.Label>Update Product Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={ProductName}
                        onChange={(e) => setProductName(e.target.value)}
                    >
                        <option value="" disabled>Select Product Type</option>
                        {productTypes.map((type, index) => (
                            <option key={index} value={type.productType}>{type.productType}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="openingStock">
                    <Form.Label>Update Opening Stock</Form.Label>
                    <Form.Control
                        type="number"
                        value={openingStock}
                        onChange={(e) => setOpeningStock(e.target.value)}
                        placeholder="Enter Opening Stock"
                    />
                </Form.Group>

                <Form.Group controlId="openingStockValue">
                    <Form.Label>Update Opening Stock Value</Form.Label>
                    <Form.Control
                        type="number"
                        value={openingStockValue}
                        onChange={(e) => setOpeningStockValue(e.target.value)}
                        placeholder="Enter Opening Stock Value"
                    />
                </Form.Group>

                <Button variant="primary mt-3" type="submit">Submit</Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Opening Stock updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>Close</Button>
                </Modal.Footer>
            </Modal>

            {alertMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </Card>
    );
};

export default UpdateInventory;
