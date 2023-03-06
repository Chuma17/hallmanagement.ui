import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const ChiefHallAdminLogin = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        const response = await axios.post("https://localhost:44324/api/ChiefHallAdmin/chiefHallAdmin-login", { userName, password });

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data)
            navigate("/chiefHallAdmin-dashboard");
        }                    
        else{
            console.log(response.message)
        }

    };

    return <>
    <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">Login</h3>
            <hr />

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="userNameAddress">User Name</label>
                <input
                    type="text"
                    id="userNameAddress"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
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

            <p className="mb-2 pb-lg-2 mb-4 text-center">Don't have an account? <Link to="/register">Register here</Link></p>

        </form>
    </>
}
 
export default ChiefHallAdminLogin;