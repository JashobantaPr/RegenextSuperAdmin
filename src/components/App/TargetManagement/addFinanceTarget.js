import React, { useState, useEffect } from "react";
import { Form, Button, Card, Modal, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { API_URL } from "../../../server";
import './styles.css';

const AddTarget = () => {
    const [targets, setTargets] = useState(
        Array.from({ length: 12 }, () => ({
            monthVolume: '',
            monthValue: ''
        }))
    );
    const [showModal, setShowModal] = useState(false);
    const personal = sessionStorage.getItem("personalid");
    const [showAlert, setShowAlert] = useState(false);
    const [Product, setProduct] = useState('');
    const [Geography, setGeography] = useState('');
    const [Associate, setAssociates] = useState([]);
    const [Year, setYear] = useState('');
    const [products, setProducts] = useState([]);
    const [years, setYears] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL+"getAllProductType", { method: "POST" });
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

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearList = Array.from({ length: currentYear - 2021 }, (_, i) => 2022 + i);
        setYears(yearList);
    }, []);

    const handleMonthChange = (index, field, value) => {
        const updatedTargets = [...targets];
        updatedTargets[index][field] = value;
        setTargets(updatedTargets);
    };

    const handleAssociateSelect = (selectedOptions) => {
        setAssociates(selectedOptions.map(option => option.value));
    };

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
            admin_id: personal,
            Product,
            Geography,
            Associate,
            Year: parseInt(Year, 10),
            MonthlyTargets
        });

        fetch(API_URL + "addFinanceTarget", {
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
                <h3 className="text-center mb-4">Set Target For Inventory</h3>
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
                                    onChange={handleAssociateSelect}
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
                                        onChange={(e) => handleMonthChange(index, 'monthVolume', e.target.value)}
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
                                        onChange={(e) => handleMonthChange(index, 'monthValue', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Submit
                    </Button>
                </Form>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Inventory Target Added Successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {showAlert && (
                <Alert variant="danger" className="mt-4" onClose={() => setShowAlert(false)} dismissible>
                    All fields are required. Please ensure all values are correctly filled.
                </Alert>
            )}
        </div>
    );
};

export default AddTarget;
