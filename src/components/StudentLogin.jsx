import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

const StudentLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const [auth, setAuth] = useState();

    const handleLoginSubmit = () => {
        axios
            .post("http://localhost:5001/api/student/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            .then((res) => {
                // console.log(res.data);
                if (res.data.loginFlag) {
                    navigate("/student/dashboard");
                    window.alert(res.data.msg);
                    sessionStorage.setItem("auth-token", res.data.authToken);
                    sessionStorage.setItem("user-info", res.data.userInfo);
                    sessionStorage.setItem("user-type", "student");
                    setAuth(sessionStorage.getItem("auth-token"));
                } else {
                    window.alert(res.data.error);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    };

    useEffect(() => {
        setAuth(sessionStorage.getItem("auth-token"));
    }, [auth]);

    if (!auth) {
        return (
            <main className="login-container">
                <div className="heading">WELCOME BACK!</div>
                <div className="container">
                    <div className="title">Student Login</div>
                    <div className="content">
                        <div className="form">
                            <div className="user-details">
                                <div className="input-box input-box-xl">
                                    <span className="details">Email</span>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <br />
                                <div className="input-box input-box-xl">
                                    <span className="details">Password</span>
                                    <input
                                        type="password"
                                        ref={passwordRef}
                                        placeholder="Enter your Password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="forgot-password">
                                <span>Forgot Password?</span>
                                <span>
                                    <a href="mailto:jaykanjia11@gmail.com">
                                        Request Reset Password
                                    </a>
                                </span>
                            </div>
                            <div className="button">
                                <button
                                    onClick={handleLoginSubmit}
                                    className="login-btn"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="form-login-option">
                                <Link to="/admin/login">Go to Admin Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        if (sessionStorage.getItem("user-type") === "client")
            navigate("/client/dashboard");
        else if (sessionStorage.getItem("user-type") === "admin")
            navigate("/admin/dashboard");
    }
};

export default StudentLogin;
