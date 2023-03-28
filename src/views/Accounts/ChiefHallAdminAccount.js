import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ChiefHallAdminAccount = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [email, setEmail] = useState(userInfo.email);   
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`https://localhost:44324/api/ChiefHallAdmin/update-chiefHallAdmin`,
                { firstName, lastName, email },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    }
                });

            if (response.status === 200) {
                userInfo.firstName = firstName;
                userInfo.lastName = lastName;                
                userInfo.email = email;
                const updatedStudent = JSON.stringify(userInfo);
                localStorage.setItem('user', updatedStudent);

                setSuccess(response.data);
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                setError(error.response.data);
            }
        }
    };

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
                window.location.reload();
            }, 3000);
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
                                    <h5 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Edit Account</h5>

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
                                        <label className="form-label" htmlfor="form3Example3">Email address</label>
                                        <input
                                            type="email"
                                            id="form3Example3"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>                                    

                                    <div className="text-center">

                                        <button type="submit" className="btn btn-dark w-25 btn-block mb-4">
                                            Update
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

export default ChiefHallAdminAccount;