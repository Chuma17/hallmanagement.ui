import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StudentDevices = () => {
    const [studentDevices, setstudentDevices] = useState([]);
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

                setstudentDevices(data);
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
    }, [setstudentDevices]);


    return <>
        <div className="container ms-auto me-auto mt-3">

            <div className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>STUDENT DEVICES [ {studentDevices.length} ]</h3>
                <Link to="/add-device"><button className="btn btn-success">Add Device</button></Link>
            </div>

            <div className="row">

                {studentDevices && studentDevices.map(device => {

                    return <div className="col-4 d-flex justify-content-around">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{device.matricNo}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <p>Item {device.item}</p>
                                <p>Color {device.color}</p>
                                <hr />
                                <p>{device.description}</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </>
}


export default StudentDevices;