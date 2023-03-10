import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StudentDashBoard = () => {

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [hallTypes, setHallTypes] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        async function getHallTypes() {
            const { data } = await axios.get("https://localhost:44324/api/HallType/get-all-hallTypes");
            setHallTypes(data);
        }

        getHallTypes();
    }, [setHallTypes])
    return <>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Home</h1>

        <div className="col container d-flex justify-content-evenly mt-5">

            <div>

                <Link to="/student-devices">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i class="fa-solid fa-layer-group"></i></h1>
                            <h3 class="card-text" style={{ textDecoration: "none !important" }}>View Devices</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/selection">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-list"></i></h1>
                            <h3 class="card-text select-text">Start Selection</h3>
                        </div>
                    </div>
                </Link>

            </div>

            <div>

                <Link to="/student-exit-passes">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-users"></i></h1>
                            <h3 class="card-text select-text">Exit Pass</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/student-complaint-form">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-users"></i></h1>
                            <h3 class="card-text select-text">Complaint Form</h3>
                        </div>
                    </div>
                </Link>

            </div>

        </div>

    </>
}

export default StudentDashBoard;