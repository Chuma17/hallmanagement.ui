import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {

    const [matricNo, setMatricNo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post("https://localhost:44324/api/Students/student-login", { matricNo, password });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(response.data)
                navigate("/student-dashboard");
            }

        } catch (error) {
            console.log(error.response.data)
            window.alert(error.response.data.message)
        }

    };

    return <>

        <section className="vh-110" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                        alt="login form" className="img-fluid h-100" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form className="form" onSubmit={submitHandler}>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Student Login</h5>

                                            <div className="mb-4 me-4 ms-4">
                                                <label className="form-label" htmlFor="matricNoAddress">Matric Number</label>
                                                <input
                                                    type="text"
                                                    id="matricNoAddress"
                                                    value={matricNo}
                                                    onChange={e => setMatricNo(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="mb-4 me-4 ms-4">
                                                <label className="form-label" htmlFor="userPassword">Password</label>
                                                <input
                                                    type="password"
                                                    id="userPassword"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                                                Sign in
                                            </button>

                                            <p className="mb-2 pb-lg-2 mb-4 text-center">Don't have an account? <Link to="/student-registeration">Register here</Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>        
    </>
}

export default StudentLogin;