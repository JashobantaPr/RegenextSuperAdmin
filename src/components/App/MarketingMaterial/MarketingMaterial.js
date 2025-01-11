import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_PATH } from "../../../server";

const MarketingMaterial = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [stockistData, setStockistData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const navigate = useNavigate();

    // Fetch marketing materials data on component mount
    useEffect(() => {
        getStockist();
    }, []);

    const getStockist = () => {
        const formdata = new FormData();
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch(API_URL + "getMarketingMaterial", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    setStockistData(result.result1);
                    setAlertMessage(result.message);
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                } else {
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleAddMarketingMaterial = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddMarketingMaterial`);
    };

    const handleUpdateMarketingMaterial = (item) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateMarketingMaterial`, {
            state: item, // Passing the full item object to the update screen
        });
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={handleAddMarketingMaterial}
                    className="btn ripple btn-primary"
                >
                    <i className="fe fe-plus me-2">Add Marketing Material</i>
                </Button>
            </div>

            <Table striped style={{ marginTop: "30px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockistData.map((item) => (
                        <tr key={item._id}>
                            <td><h5>{item.marketingMaterial}</h5></td>
                            <td>
                                {item.image ? (
                                    <img
                                        src={IMG_PATH + item.image}
                                        alt={item.marketingMaterial}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", cursor: 'pointer' }}
                                        onClick={() => handleImageClick(item.image)}
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </td>
                            <td>
                                <Button onClick={() => handleUpdateMarketingMaterial(item)} className="ms-3">
                                    Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Display alert if alertMessage is not empty */}
            {alertMessage && (
                <div className="alert alert-success" role="alert">
                    {alertMessage}
                </div>
            )}

            {/* Modal to display image in full screen */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Body>
                    <div style={{ position: "relative" }}>
                        <img
                            src={IMG_PATH + selectedImage}
                            alt="Selected"
                            style={{ width: "100%", height: "auto" }}
                        />
                        <Button
                            variant="danger"
                            onClick={handleCloseModal}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                borderRadius: "50%",
                                padding: "10px",
                            }}
                        >
                            X
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MarketingMaterial;
