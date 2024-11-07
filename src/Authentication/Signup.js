import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase"
import { Button, Col, Form, FormGroup, Row,Alert } from 'react-bootstrap';
import { API_URL } from '../server';

function Signup() {
    const [err, setError] = useState("");
    const [email,setEmail] = useState("");
    const [number,setnumber]=useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconformPassword] = useState('');
    const [data, setData] = React.useState({
        email: "",
        mobileNumber:"",
        password:"",
        confirmPassword: "",
      })
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `${process.env.PUBLIC_URL}/dashboard/dashboard-1/`; 
      navigate(path);
    }

    const ghgh =(e) =>{
        console.log("hyfyty")
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "email": email,
          "mobileNumber": number,
          "password": password,
          "confirmPassword": confirmPassword
        });

        console.log('rawx',raw)
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(API_URL+"adminRegistration", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            navigate(`${process.env.PUBLIC_URL}/authentication/login`);
          })
          .catch((error) => console.error(error));
    }
    return (
        <div>
<div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
            <div className="page bg-primary">
                <div className="page-single">
            <div className="container">
                <Row>
                    <Col
                        xl={5}
                        lg={6}
                        md={8}
                        sm={8}
                        xs={10}
                        className="card-sigin-main py-4 justify-content-center mx-auto"
                    >
                        <div className="card-sigin ">
                            {/* <!-- Demo content--> */}
                            <div className="main-card-signin d-md-flex">
                                <div className="wd-100p">
                                    <div className="d-flex mb-4">
                                    <Link to="#">
                                            <img
                                                src={require("../assets/img/myimages/outside.png")}
                                                className="sign-favicon ht-40"
                                                alt="logo"
                                                style={{marginLeft:"30px",width:"300px",height:"50px"}}
                                            />
                                        </Link>
                                    </div>
                                    <div className="">
                                        <div className="main-signup-header">
                                            {err && <Alert variant="danger">{err}</Alert>}
                                            <Form >
                                                <FormGroup className="form-group">
                                                    <label>Email</label>{" "}
                                                    <Form.Control
                                                        className="form-control"
                                                        placeholder="Enter your email"
                                                        type='text'
                                                        name="email"
                                                        value={email}
                                                        onChange={(e)=>setEmail(e.target.value)}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <label>Mobile Number</label>{" "}
                                                    <Form.Control
                                                        className="form-control"
                                                        placeholder="Enter your Mobile Number"
                                                        type='text'
                                                        value={number}
                                                        onChange={(e)=>setnumber(e.target.value)}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <label>Password</label>{" "}
                                                    <Form.Control
                                                        className="form-control"
                                                        placeholder="Enter your password"
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e)=>setPassword(e.target.value)}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <label>confirm Password</label>{" "}
                                                    <Form.Control
                                                        className="form-control"
                                                        placeholder="Enter your confirm password"
                                                        type='password'
                                                        name="confirm password"
                                                        value={confirmPassword}
                                                        onChange={(e)=>setconformPassword(e.target.value)}
                                                    />
                                                </FormGroup>
                                                <Button
                                                    variant=""
                                                    className="btn btn-primary btn-block"
                                                    onClick={(e)=>ghgh(e)}
                                                >
                                                    Create Account   
                                                </Button>
                                                <div className="main-signup-footer mt-3 text-center ">
                                                   <p>Already have an account?  <Link to={`${process.env.PUBLIC_URL}/authentication/login`} >Login</Link></p>
                                                </div>
                                            </Form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
            </div>
        </div>
    );
}
Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
