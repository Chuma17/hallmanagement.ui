import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDashBoard = () => {

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [hallTypes, setHallTypes] = useState([]);
    const [studentDevices, setstudentDevices] = useState([]);
    const navigate = useNavigate();

    const devices = async e => {
        e.preventDefault();

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
                navigate("/student-login");
            }
            else {
                console.error(error);
            }
        }

    }

    useEffect(() => {
        async function getHallTypes() {
            const { data } = await axios.get("https://localhost:44324/api/HallType/get-all-hallTypes");
            setHallTypes(data);
        }

        getHallTypes();
    }, [setHallTypes])
    return <>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Home</h1>
        <button className="btn btn-dark" onClick={devices}>View Devices</button>
        <div className="container ms-auto me-auto mt-3">
            <div className="row">

                {hallTypes && hallTypes.map(hallType => {

                    return <div className="col">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{hallType.description}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <p>Hall count {hallType.hallCount}</p>
                                <p>Room space {hallType.roomSpaceCount}</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>

        <div className="container ms-auto me-auto mt-3">
            <div className="row">

                {studentDevices && studentDevices.map(device => {

                    return <div className="col">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{device.matricNo}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <p>Item {device.item}</p>
                                <p>Color {device.color}</p>
                                <p>Description {device.description}</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>

    </>
}

export default StudentDashBoard;