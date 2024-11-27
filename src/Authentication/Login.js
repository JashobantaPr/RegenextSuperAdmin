import React, { useState } from 'react';
import { Button, Col, Form, Row,Alert} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../Firebase/firebase';
import { API_URL } from '../server';

const SignIn = () => {
  const [err, setError] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [data, setData] = useState({
   "email": "adminreact@gmail.com",
  "password": "1234567890",
  })
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("");
  }
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `${process.env.PUBLIC_URL}/app/TBMManagement/`; 
    navigate(path);
  }

  const Login = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "email": email,
      "password": password
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(API_URL+"adminLogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status == true){
          console.log("result",result)
        //storage
        sessionStorage.setItem("personalid", result.admin._id);
        console.log("personalid",result.admin._id);
        routeChange()
        }
       else{
        console.log(result)
       }       
      })
      .catch((error) => console.error(error));
  }
  return (
    <React.Fragment>
      <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
      <div className="page bg-primary">
    <div className="page-single">
      <div className="container"  style={{ marginTop: "89px" }} >
        <Row>
          <Col
            xl={5}
            lg={6}
            md={8}
            sm={8}
            xs={10}
            className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
          >
            <div className="card-sigin">
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
                      <div className="panel panel-primary">
                        <div className=" tab-menu-heading mb-2 border-bottom-0">
                          <div className="tabs-menu1">
                            {err && <Alert variant="danger">{err}</Alert>}
                            <Form >
                              <Form.Group className="form-group">
                                <Form.Label className=''>Email</Form.Label>{" "}
                                <Form.Control
                                  className="form-control"
                                  placeholder="Enter your email"
                                  name="email"
                                  type='text'
                                  value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                                  required
                                />
                              </Form.Group>
                              <Form.Group className="form-group">
                                <Form.Label>Password</Form.Label>{" "}
                                <Form.Control
                                  className="form-control"
                                  placeholder="Enter your password"
                                  name="password"
                                  type='password'
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)}
                                  required
                                />
                              </Form.Group>
                              <Button
                                variant=""
                                type='submit'
                                className="btn btn-primary btn-block"
                                onClick={Login}
                                
                              >
                                Sign In
                              </Button>
                              
                              <div className="mt-3 d-flex text-center justify-content-center mb-2">
                               
                              </div>
                              <div className="main-signin-footer text-center mt-3">
                              {/* <p><Link to="#" className="mb-3">Forgot password?</Link></p> */}
                               <p>Don't have an account ? <Link to={`${process.env.PUBLIC_URL}/authentication/signup`} className=""> Create an Account</Link></p>
                                </div>
                            </Form>
                          </div>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div >
    </div>
</React.Fragment>
  );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
