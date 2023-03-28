import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PorterRegistration = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem("user"));


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [hallId, setHallId] = useState("");
    const [halls, setHalls] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`https://localhost:44324/api/Porter/Porter-registration`,
                { firstName, lastName, email, password, userName, hallId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setSuccess(response.data);
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");

                navigate("/chiefHallAdmin-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        async function getHalls() {
            try {
                const { data } = await axios.get("https://localhost:44324/api/Hall/get-assigned-halls",
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });
                setHalls(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/chiefHallAdmin-login");
                }
                else {
                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }

        }

        getHalls();
    }, [setHalls]);

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                navigate("/porters")
            }, 1000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);


    return <>

        <section className="background-radial-gradient overflow-hidden">

            <div className="container px-4 py-2 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-8 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <button className="btn btn-danger mb-3" onClick={goBack}>Go Back</button>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>
                                    <h5 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Register Porter Account</h5>

                                    {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                    {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="confirmpassword"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="userName">User Name</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            value={userName}
                                            onChange={e => setUserName(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlfor="halls">Halls</label>
                                        <select value={hallId} onChange={e => setHallId(e.target.value)} required className="form-control form-select">
                                            <option hidden value="">--- Select Hall ---</option>

                                            {halls.length > 0 && halls.map(hall => {
                                                return <option key={hall.hallId} value={hall.hallId}> {hall.hallName} </option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="text-center">

                                        <button type="submit" className="btn btn-dark w-25 btn-block mb-4">
                                            Register
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>        
    </>
}

export default PorterRegistration;