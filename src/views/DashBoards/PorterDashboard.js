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
                <button className="btn btn-danger" disabled></button>
                <h3>STUDENT DEVICES [ {studentDevices.length} ]</h3>
                <button className="btn btn-success" disabled></button>
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

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Matric No</th>
                        <th scope="col">Item</th>
                        <th scope="col">Serial No</th>
                        <th scope="col">Color</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentDevices?.map((device, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{device?.matricNo}</td>
                                <td>{device?.item}</td>
                                <td>{device?.serialNo}</td>
                                <td>{device?.color}</td>
                                <td>{device?.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>            
        </div>
    </>
}


export default PorterDashboard;