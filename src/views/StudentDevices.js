import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StudentDevices = () => {
    const [studentDevices, setStudentDevices] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        async function getDevices() {

            try {
                const { data } = await axios.get("https://localhost:44324/api/Students/get-studentDevices",
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

                    navigate("/student-login");
                }
                else {
                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }
        }

        getDevices();
    }, [setStudentDevices]);


    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>STUDENT DEVICES [ {studentDevices.length} ]</h3>
                <Link to="/add-device"><button className="btn btn-success">Add Device</button></Link>
            </div>

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Serial No</th>
                        <th scope="col">Color</th>
                        <th scope="col">Device Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentDevices.length > 0 ? studentDevices.map((device, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{device.item}</td>
                                <td>{device.serialNo}</td>
                                <td>{device.color}</td>
                                <td>{device.description}</td>
                            </tr>
                        )) : (
                            <>
                                <div className="text-center mt-3">
                                    <h2>No Devices</h2>
                                </div>
                            </>
                        )
                    }
                </tbody>
            </table>            
        </div>
    </>
}


export default StudentDevices;