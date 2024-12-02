import { formatDate } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../server";

const AddInventory = () => {
    const [ProductName, setProductName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedStockist, setSelectedStockist] = useState("");
  const [stockists, setStockists] = useState([]);
    const [name, setName] = useState('');
    const [OVolume, setOVolume] = useState('');
    const [OValue, setOValue] = useState('');
    const [PVolume, setPVolume] = useState('');
    const [PValue, setPValue] = useState('');
    const [SVolume, setSVolume] = useState('');
    const [SValue, setSValue] = useState('');
    const [CVolume, setCVolume] = useState('');
    const [CValue, setCValue] = useState('');
    const [Cname, setCname] = useState('');
    const [date, setdate] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const personal = sessionStorage.getItem("personalid");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductTypes = async () => {
          const requestOptions = {
            method: "POST",
            redirect: "follow",
          };
    
          try {
            const response = await fetch(
              API_URL+"getAllProductType",
              requestOptions
            );
            const data = await response.json();
    
            if (data.status && Array.isArray(data.result1)) {
              const types = data.result1.map((item) => item.productType);
              setProductTypes(types);
            } else {
              console.error("Unexpected API response:", data);
            }
          } catch (error) {
            console.error("Error fetching product types:", error);
          }
        };
    
        fetchProductTypes();
      }, []);

      useEffect(() => {
        const fetchStockists = async () => {
          const requestOptions = {
            method: "POST",
            redirect: "follow",
          };
    
          try {
            const response = await fetch(API_URL+"getAllStockist", requestOptions);
            const data = await response.json();
    
            if (data.status && Array.isArray(data.result)) {
              // Extract stockist names
              const stockistList = data.result
                .flatMap(item => item.stockist) // Flatten stockist arrays
                .filter(Boolean); // Remove null or undefined values
              setStockists(stockistList);
            } else {
              console.error("Unexpected API response:", data);
            }
          } catch (error) {
            console.error("Error fetching stockists:", error);
          }
        };
    
        fetchStockists();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": personal,
            "productType":ProductName,
            "stockist": selectedStockist,
            "openingStock": {
                "volume": OVolume,
                "value": OValue
            },
            "purchase": {
                "volume": PVolume,
                "value": PValue
            },
            "sales": {
                "volume": SVolume,
                "value": SValue
            },
            "closingStock": {
                "volume": CVolume,
                "value": CValue
            },
            "inventoryDays": 28,
            "categoryType": Cname,
            "date": date
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch(API_URL + "addInventory", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("result is ", result);
                if (result.status === true) {
                    setShowModal(true);
                }
                else {
                    setShowAlert(true);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
    };

    return (
        <>
            <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                    <Form.Label>Add Product Type</Form.Label>
                <Form.Control
                    as="select"
                    value={ProductName}
                    onChange={(e) => setProductName(e.target.value)}
                >
                    <option value="" disabled>Select Product Type</option>
                    {productTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </Form.Control>
                        <Form.Label>Add stockist</Form.Label>
                        <Form.Control
          as="select"
          value={selectedStockist}
          onChange={(e) => setSelectedStockist(e.target.value)}
        >
          <option value="" disabled>
            Select a Stockist
          </option>
          {stockists.map((stockist, index) => (
            <option key={index} value={stockist}>
              {stockist}
            </option>
          ))}
        </Form.Control>
                        <Form.Label>Add openingStock</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={OVolume}
                            onChange={(e) => setOVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={OValue}
                            onChange={(e) => setOValue(e.target.value)}
                        />
                        <Form.Label>Add purchase</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={PVolume}
                            onChange={(e) => setPVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={PValue}
                            onChange={(e) => setPValue(e.target.value)}
                        />
                        <Form.Label>Add Sales</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={SVolume}
                            onChange={(e) => setSVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={SValue}
                            onChange={(e) => setSValue(e.target.value)}
                        />
                        <Form.Label>Add closingStock</Form.Label>
                        <Form.Control
                            type="Number"
                            placeholder="Enter Volume"
                            value={CVolume}
                            onChange={(e) => setCVolume(e.target.value)}
                        />
                        <Form.Control
                            type="Number"
                            placeholder="Enter Value"
                            value={CValue}
                            onChange={(e) => setCValue(e.target.value)}
                        />
                        <Form.Label>Add Date</Form.Label>
                        <Form.Control
                            type="Date"
                            placeholder="Select Date"
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                        />
                        <Form.Label>Select Stockist Category</Form.Label>
                        <select
                            type="text"
                            placeholder="Select Category Type"
                            value={Cname}
                            onChange={(e) => setCname(e.target.value)}
                            style={{ width: 460 }}
                        >
                            <option value="active">Select (Active / Inactive)</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        
                    </Form.Group>
                    <Button variant="primary mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>

            {/* Modal to show success message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Inventory Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Alert to show success message */}
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    All parameters are required fields
                </Alert>
            )}
        </>
    );
};

export default AddInventory;
