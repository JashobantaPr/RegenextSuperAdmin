import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL, IMG_PATH } from "../../../server";

const MarketingMaterial = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [StockistData, setStockistData] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedImage, setSelectedImage] = useState(''); // State to store the selected image
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

        fetch(API_URL + "getMarketingMaterial", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status === true){
                    console.log("result is ", result);
                    setStockistData(result.result1);
                    setAlertMessage(result.message);
                    // Clear the alert after 3 seconds
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                }
                else{
                    setAlertMessage('Error fetching data from the API');
                }
            })
            .catch((error) => console.error(error));
    };

    const AddMarketingMaterial = () => {
        navigate(`${process.env.PUBLIC_URL}/app/AddMarketingMaterial`, {});
    };

    const navup = (item) => {
        navigate(`${process.env.PUBLIC_URL}/app/UpdateMarketingMaterial`, {
            state: item // Passing the full item object to the update screen
        });
    };

    // Function to handle the image click
    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the selected image
        setShowModal(true); // Show the modal
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setSelectedImage(''); // Clear the selected image
    };

    return (
        <div>
            <div className="left-content mt-4">
                <Button
                    style={{ marginLeft: "800px" }}
                    onClick={AddMarketingMaterial}
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
                    {StockistData.map((item) => (
                        <tr key={item._id}>
                            <td><h5>{item.marketingMaterial}</h5></td>
                            <td>
                                {item.image ? (
                                    <img
                                        src={IMG_PATH + item.image} // Path for the image
                                        alt={item.marketingMaterial}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", cursor: 'pointer' }}
                                        onClick={() => handleImageClick(item.image)} // Handle image click
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </td>
                            <td>
                                <Button onClick={() => navup(item)} className="ms-3">Update</Button>
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
                            src={IMG_PATH + selectedImage} // Path to the selected image
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
                                padding: "10px"
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
