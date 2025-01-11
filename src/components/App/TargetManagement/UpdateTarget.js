import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import { API_URL } from "../../../server";
import './styles.css';

const UpdateTarget = () => {
    const [targets, setTargets] = useState(
        Array.from({ length: 12 }, () => ({
            monthVolume: '',
            monthValue: ''
        }))
    );
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [Product, setProduct] = useState('');
    const [Geography, setGeography] = useState('');
    const [Associate, setAssociates] = useState([]);
    const [Year, setYear] = useState('');
    const [products, setProducts] = useState([]);
    const [years, setYears] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id  = location?.state?._id; // Safely access id from location state
    const admin_id = localStorage.state?.admin_id;
    console.log('Fetched ID:', id); // Log the ID to debug

    useEffect(() => {
        // Check if the id is available in URL
        console.log('Fetching data for target with ID:', id);

        if (id) {
            const fetchExistingTarget = async () => {
                try {
                    const requestOptions = {
                        method: "POST",
                        redirect: "follow"
                    };

                    // Make the fetch request to the new API
                    const response = await fetch(API_URL+"getFinanceTarget", requestOptions);
                    const result = await response.text();
                    console.log("Fetched data: ", result); // Log the fetched response for debugging

                    // Parse the result if it's in JSON format
                    const data = JSON.parse(result);

                    if (data.status && data.data && data.data.length > 0) {
                        const targetData = data.data[0]; // Assuming you want the first target
                        setProduct(targetData.Product);
                        setGeography(targetData.Geography);
                        setYear(targetData.Year.toString());
                        setAssociates(targetData.Associate);
                        setTargets(targetData.MonthlyTargets.map(target => ({
                            monthVolume: target.TargetVolume,
                            monthValue: target.TargetValue
                        })));
                    } else {
                        console.log('No data found for this ID.');
                    }
                } catch (error) {
                    console.error("Error fetching target data:", error);
                }
            };
            fetchExistingTarget();
        } else {
            console.log("ID is missing, unable to fetch data.");
        }
    }, [id]);

    // Fetch available products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL + "getAllProductType", { method: "POST" });
                const result = await response.json();
                if (result.status) {
                    setProducts(result.result1);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Fetch available users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL + "getAllUsers", { method: "POST" });
                const result = await response.json();
                if (result.status) {
                    const filteredUsers = result.users.filter(user =>
                        ["TBM", "ABM", "ZH"].includes(user.userType)
                    );
                    setUsers(filteredUsers);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch available years
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearList = Array.from({ length: currentYear - 2021 }, (_, i) => 2022 + i);
        setYears(yearList);
    }, []);

    // Handle form submission for updating target data
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!Product || !Geography || !Year || Associate.length === 0) {
            setShowAlert(true);
            return;
        }

        const isValidTargets = targets.every(
            (target) => target.monthVolume !== '' && target.monthValue !== '' && !isNaN(target.monthVolume) && !isNaN(target.monthValue)
        );

        if (!isValidTargets) {
            setShowAlert(true);
            return;
        }

        const MonthlyTargets = targets.map((target, index) => ({
            Month: new Date(0, index).toLocaleString('en-US', { month: 'long' }),
            TargetVolume: Number(target.monthVolume),
            TargetValue: Number(target.monthValue)
        }));

        const raw = JSON.stringify({
            id:id,
            Product,
            Geography,
            Associate,
            Year: parseInt(Year, 10),
            MonthlyTargets
        });

        fetch(API_URL + "updateFinanceTarget", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setShowModal(true);
                } else {
                    setShowAlert(true);
                }
            })
            .catch((error) => console.error("Error with API request:", error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`${process.env.PUBLIC_URL}/app/Target`);
    };

    return (
        <div className="container mt-5">
            <Card className="p-4 shadow">
                <h3 className="text-center mb-4">Update Target For Inventory</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="product">
                                <Form.Label>Product</Form.Label>
                                <Select
                                    options={products.map(productItem => ({
                                        value: productItem.productType,
                                        label: productItem.productType
                                    }))}
                                    value={Product ? { value: Product, label: Product } : null}
                                    onChange={(selected) => setProduct(selected ? selected.value : '')}
                                    placeholder="Select a Product"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="geography">
                                <Form.Label>Geography</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={Geography}
                                    onChange={(e) => setGeography(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="associates">
                                <Form.Label>Associates</Form.Label>
                                <Select
                                    isMulti
                                    options={users.map(user => ({
                                        value: user._id,
                                        label: user.name
                                    }))}
                                    value={Associate.map(associateId => users.find(user => user._id === associateId) ? { value: associateId, label: users.find(user => user._id === associateId).name } : null)}
                                    onChange={(selected) => setAssociates(selected ? selected.map(option => option.value) : [])}
                                    placeholder="Select Associates"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Select
                                    options={years.map(year => ({ value: year, label: year }))}
                                    value={Year ? { value: Year, label: Year } : null}
                                    onChange={(selected) => setYear(selected ? selected.value : '')}
                                    placeholder="Select a Year"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <h5 className="mt-4">Monthly Targets</h5>
                    {targets.map((target, index) => (
                        <Row className="mb-3" key={index}>
                            <Col md={6}>
                                <Form.Group controlId={`monthVolume-${index}`}>
                                    <Form.Label>{new Date(0, index).toLocaleString('en-US', { month: 'long' })} Volume</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Volume"
                                        value={target.monthVolume}
                                        onChange={(e) => {
                                            const updatedTargets = [...targets];
                                            updatedTargets[index].monthVolume = e.target.value;
                                            setTargets(updatedTargets);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={`monthValue-${index}`}>
                                    <Form.Label>{new Date(0, index).toLocaleString('en-US', { month: 'long' })} Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Value"
                                        value={target.monthValue}
                                        onChange={(e) => {
                                            const updatedTargets = [...targets];
                                            updatedTargets[index].monthValue = e.target.value;
                                            setTargets(updatedTargets);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                    <div className="text-center">
                        <Button variant="primary" type="submit">Update Target</Button>
                    </div>
                    {showAlert && (
                        <Alert variant="danger" className="mt-3">
                            Please fill in all fields and ensure all target values are valid.
                        </Alert>
                    )}
                </Form>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Target successfully updated!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateTarget;
