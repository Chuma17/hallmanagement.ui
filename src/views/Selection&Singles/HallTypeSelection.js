import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const HallTypeSelection = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [hallTypes, setHallTypes] = useState([]);

    useEffect(() => {
        async function getHallTypes() {
            const { data } = await axios.get("https://localhost:44324/api/HallType/get-all-hallTypes");
            setHallTypes(data);
        }

        getHallTypes();
    }, [setHallTypes])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Hall Types [ {hallTypes.length} ]</h3>
                <Link to="/select-block"><button className="btn btn-success">Select Block</button></Link>
            </div>

            <div className="row">

                {hallTypes && hallTypes.map(hallType => {

                    return <div className="col-md-4 d-flex justify-content-around">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center fs-5">
                                <h3 className="card-title">{hallType.description}</h3>
                                <hr />
                                <p>Hall count: {hallType.hallCount}</p>
                                <p>{hallType.roomSpaceCount} in a room</p>
                                <Link to={`/halls/${hallType.hallTypeId}`}><button className="btn btn-light">View Halls</button></Link>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </>
}

export default HallTypeSelection;