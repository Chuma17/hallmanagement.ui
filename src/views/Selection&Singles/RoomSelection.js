import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RoomSelection = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId;
    const blockId = user.blockId;
    const goBack = () => navigate(-1);

    const [rooms, setRooms] = useState([]);

    async function getRooms() {
        try {
            if (!hallId || !blockId) {
                throw new Error("Hall ID or block ID is not set");
            }
            else {
                const { data } = await axios.get(`https://localhost:44324/api/Hall/get-rooms-in-hall/${hallId}`);
                setRooms(data);
            }

        }
        catch (error) {
            console.log(`Error fetching rooms: ${error.message}`);
        }
    }

    useEffect(() => {
        getRooms();
    }, [hallId])


    return <>
        <div className="container ms-auto me-auto mt-3">

            <div className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Rooms [ {rooms.length} ]</h3>
                <Link to="/student-dashboard"><button className="btn btn-success">Dashboard</button></Link>
            </div>

            <div className="row">

                {blockId !== null ? (
                    rooms.length > 0 ? (
                        rooms.map(room => {
                            <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

                            return <div className="col-md-4 d-flex justify-content-around">

                                <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                    <div className="card-body text-center fs-5">
                                        <h3 className="card-title">Room {room.roomNumber}</h3>
                                        <hr />

                                        <p style={{ textAlign: "left" }}>Maximum students: {room.maxOccupants}</p>
                                        <p style={{ textAlign: "left" }}>Available Space: {room.availableSpace} </p>
                                        <p style={{ textAlign: "left" }}>Students in the room: {room.studentCount} </p>
                                        <hr />

                                        <p style={{ textAlign: "left" }}>Room Available: {room.isUnderMaintenance === true && <span>No</span>} {room.isUnderMaintenance === false && <span>Yes</span>} </p>
                                        <p style={{ textAlign: "left" }}>Room Full: {room.isFull === true && <span>Yes</span>} {room.isFull === false && <span>No</span>} </p>

                                        <hr />
                                        <Link to={`/view-select-room/${room.roomId}`}><button className="btn btn-light">View room</button></Link>
                                    </div>
                                </div>
                            </div>
                        })

                    ) : (

                        <div className="d-flex flex-column">
                            <h2>No Rooms are in this block</h2>
                            <button className="btn btn-danger w-25" onClick={goBack}>
                                Go Back
                            </button>
                        </div>
                    )

                ) : (

                    <div className="d-flex flex-column">
                        <h2>Select a block first</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>
                )}

            </div>
        </div >
    </>
}

export default RoomSelection;