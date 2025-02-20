import React, { useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import "./LoginScreen.css";
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            setLoading(true);
            setError(""); // Reset error before making a new request

            const { data } = await axios.post("/api/users/login", { email, password }, config);
            console.log(data);  // Check the structure of the response in the console

            // If you need to use the response data for something
            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false);
        } catch (error) {
            
            setError(error.response.data.message);
        }
    }

    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading/>} 

                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default LoginScreen;
