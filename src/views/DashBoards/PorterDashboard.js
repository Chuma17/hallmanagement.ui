import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const PorterDashboard = () => {
    const [studentDevices, setStudentDevices] = useState([]);
    const [matricNo, setMatricNo] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);


    async function getDevices(e) {

        e.preventDefault();
        try {
            const { data } = await axios.post("https://localhost:44324/api/StudentDevice/get-studentDevices-by-matricNo", { matricNo },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    }
                }
            );

            setStudentDevices(data);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");

                navigate("/porter-login");
            }
            else {
                window.alert(error.response.data);
                console.error(error.response.data);
            }
        }
    }


    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>STUDENT DEVICES [ {studentDevices.length} ]</h3>
                <Link to="/add-device"><button className="btn btn-success">Add Device</button></Link>
            </div>

            <form class="form-inline my-3" onSubmit={getDevices}>
                <input
                    type="text"
                    id="matricNoAddress"
                    value={matricNo}
                    onChange={e => setMatricNo(e.target.value)}
                    placeholder="Search"
                    required
                    className="form-control"
                />                    
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>

            <div className="row">

                {studentDevices && studentDevices.map(device => {

                    return <div className="col-4 d-flex justify-content-around">

                        <div className="card mt-4 mb-4 bg-dark text-light fs-5" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center">
                                <h4 className="card-title mb-3">Item: {device.item}</h4>
                                <hr />
                                <p>S/N: {device.serialNo}</p>
                                <p>Color: {device.color}</p>
                                <hr />
                                <p>Description: {device.description}</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </>
}


export default PorterDashboard;