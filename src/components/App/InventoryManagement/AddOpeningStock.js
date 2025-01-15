import React, { useEffect, useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddOpeningStock = () => {
  const [productId, setProductId] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [selectedStockist, setSelectedStockist] = useState("");
  const [stockists, setStockists] = useState([]);
  const [openingStock, setOpeningStock] = useState("");
  const [openingStockValue, setOpeningStockValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState(""); // Added state for response message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(`${API_URL}getAllProductType`, { method: "POST" });
        const data = await response.json();
        if (data.status && Array.isArray(data.result1)) {
          setProductTypes(data.result1.map((item) => ({ id: item._id, name: item.productType })));
        }
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    const fetchStockists = async () => {
      try {
        const response = await fetch(`${API_URL}getAllStockist`, { method: "POST" });
        const data = await response.json();
        if (data.status && Array.isArray(data.result)) {
          setStockists(data.result.map((item) => ({ id: item._id, name: item.stockist })));
        }
      } catch (error) {
        console.error("Error fetching stockists:", error);
      }
    };

    fetchProductTypes();
    fetchStockists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStockist || !productId || !openingStock || !openingStockValue) {
      setShowAlert(true);
      setResponseMessage("All fields are required!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      stockist_id: selectedStockist,
      product_id: productId,
      openingStock,
      openingStockValue,
    });

    try {
      const response = await fetch(`${API_URL}addOpeningStock`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });
      const result = await response.json();
      if (result.status) {
        setShowModal(true);
        setResponseMessage(result.message || "Opening stock added successfully!");
      } else {
        setShowAlert(true);
        setResponseMessage(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setShowAlert(true);
      setResponseMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
  };

  return (
    <>
      <Card style={{ marginTop: "30px", padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="stockist">
            <Form.Label>Select Stockist</Form.Label>
            <Form.Control
              as="select"
              value={selectedStockist}
              onChange={(e) => setSelectedStockist(e.target.value)}
              required
            >
              <option value="" disabled>Select a Stockist</option>
              {stockists.map((stockist) => (
                <option key={stockist.id} value={stockist.id}>{stockist.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="productType">
            <Form.Label>Select Product Type</Form.Label>
            <Form.Control
              as="select"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="" disabled>Select Product Type</option>
              {productTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="openingStock">
            <Form.Label>Opening Stock</Form.Label>
            <Form.Control
              type="number"
              value={openingStock}
              onChange={(e) => setOpeningStock(e.target.value)}
              placeholder="Enter Opening Stock"
              required
            />
          </Form.Group>

          <Form.Group controlId="openingStockValue">
            <Form.Label>Opening Stock Value</Form.Label>
            <Form.Control
              type="number"
              value={openingStockValue}
              onChange={(e) => setOpeningStockValue(e.target.value)}
              placeholder="Enter Opening Stock Value"
              required
            />
          </Form.Group>

          <Button variant="primary mt-3" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{responseMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {responseMessage}
        </Alert>
      )}
    </>
  );
};

export default AddOpeningStock;
