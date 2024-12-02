import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../server';

const UpdateInventory = () => {
    const location = useLocation();
    const iddata = location?.state;
    console.log("iddata is", iddata);
    const Iname = location?.state;
    const [alertMessage, setAlertMessage] = useState('');
    const [ProductName, setProductName] = useState(iddata.productType);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedStockist, setSelectedStockist] = useState(iddata.stockist);
    const [stockists, setStockists] = useState([]);
    const [OVolume, setOVolume] = useState(iddata.openingStock.volume);
    const [OValue, setOValue] = useState(iddata.openingStock.value);
    const [PVolume, setPVolume] = useState(iddata.purchase.volume);
    const [PValue, setPValue] = useState(iddata.purchase.value);
    const [SVolume, setSVolume] = useState(iddata.sales.volume);
    const [SValue, setSValue] = useState(iddata.sales.value);
    const [CVolume, setCVolume] = useState(iddata.closingStock.volume);
    const [CValue, setCValue] = useState(iddata.closingStock.value);
    const [Cname, setCname] = useState('');
    const [date, setdate] = useState('');
    const [showModal, setShowModal] = useState(false);
   
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductTypes = async () => {
            const requestOptions = {
                method: "POST",
                redirect: "follow",
            };

            try {
                const response = await fetch(
                    API_URL + "getAllProductType",
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
                const response = await fetch(API_URL + "getAllStockist", requestOptions);
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


    useEffect(() => {
        if (showModal) {
            setAlertMessage('');
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct();
    };

    const updateProduct = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "admin_id": iddata,
            "productType": ProductName,
            "inventory_id": Iname,
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

        fetch(API_URL + "updateInventory", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Status == true) {
                    console.log("result is ", result);
                    setShowModal(true);
                }
                else {
                    setAlertMessage("Please Fill All The Fields");
                }
            })
            .catch((error) => console.error(error));
    };

    const navigateToProducts = () => {
        navigate(`${process.env.PUBLIC_URL}/app/Inventory`);
    };

    return (
        <Card style={{ marginTop: "10px", marginLeft: "100px", padding: "20px", width: "500px" }}>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="name">
                    <Form.Label>Update Product Type</Form.Label>
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
                    <Form.Label>Update stockist</Form.Label>
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

                    <Form.Label>Update openingStock</Form.Label>
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
                    <Form.Label>Update purchase</Form.Label>
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
                    <Form.Label>Update Sales</Form.Label>
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
                    <Form.Label>Update closingStock</Form.Label>
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
                    <Form.Label>Update Date</Form.Label>
                    <Form.Control
                        type="Date"
                        placeholder="Select Date"
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                    />
                    <Form.Label>Update Stockist Category</Form.Label>
                    <select
                        type="text"
                        placeholder="Select Category Type"
                        value={Cname}
                        onChange={(e) => setCname(e.target.value)}
                        style={{ width: 460 }}
                    >
                        <option value="active">Select (Active / Inactive)</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                </Form.Group>
                <Button variant="primary mt-3" type="submit">
                    Submit
                </Button>
            </Form>
            {/* Modal for success message */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Inventory updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={navigateToProducts}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                {/* Display alert if alertMessage is not empty */}
                {alertMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        {alertMessage}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default UpdateInventory;
