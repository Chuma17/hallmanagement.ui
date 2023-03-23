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
                window.alert(response.data);
                navigate("/porters")
            }

            window.location.reload();
            console.log(response);
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
    }, [setHalls])


    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">Register Hall Admin Account</h3>
            <hr />

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

            <div className="mb-4">
                <label className="form-label" htmlfor="halls">Halls</label>
                <select value={hallId} onChange={e => setHallId(e.target.value)} required className="form-control form-select">
                    <option hidden value="">--- Select Hall ---</option>

                    {halls.length > 0 && halls.map(hall => {
                        return <option key={hall.hallId} value={hall.hallId}> {hall.hallName} </option>
                    })}
                </select>
            </div>

            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                Add
            </button>

        </form>
    </>
}

export default PorterRegistration;