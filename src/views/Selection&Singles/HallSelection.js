import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const HallSelection = () => {
    let params = useParams();
    const hallTypeId = params.id;
    const [halls, setHalls] = useState([]);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);


    useEffect(() => {
        async function getHalls() {
            const { data } = await axios.get(`https://localhost:44324/api/HallType/get-halls-in-hallType/${hallTypeId}`);
            setHalls(data);
        }

        getHalls();
    }, [setHalls])


    return <>
        <div className="container mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Halls [ {halls.length} ]</h3>
                <Link to="/select-block"><button className="btn btn-success">Select Block</button></Link>
            </div>

            <div className="row">

                {halls.length > 0 ? (
                    halls.map(hall => {

                        return <div className="col-3 mt-2  d-flex justify-content-between">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center fs-5">
                                    <h3 className="card-title bg-light text-dark p-2" style={{ borderRadius: "10%" }}>{hall.hallName}</h3>
                                    <hr />

                                    <p style={{ textAlign: "left" }}>Room count: {hall.roomCount}</p>
                                    <p style={{ textAlign: "left" }}>Available Rooms: {hall.availableRooms}</p>
                                    <p style={{ textAlign: "left" }}>Students in the hall: {hall.studentCount} </p>
                                    <hr />
                                    <p style={{ textAlign: "left" }}>Hall Available: {hall.isAssigned === true && <span>Yes</span>} {hall.isAssigned === false && <span>No</span>} </p>
                                    <p style={{ textAlign: "left" }}>Allowed Gender: {hall.hallGender} </p>

                                    <hr />
                                    <hr />
                                    <Link to={`/view-select-hall/${hall.hallId}`}><button className="btn btn-light">View Hall</button></Link>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="d-flex flex-column">
                        <h2>No halls are in this halltype</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>

                )
                }

            </div>
        </div>
    </>
}

export default HallSelection;