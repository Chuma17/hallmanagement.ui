import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const Rooms = () => {
    let params = useParams();
    const blockId = params.id;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId

    const [rooms, setRooms] = useState([]);

    async function addHandler() {
        try {
            const response = await axios.post(`https://localhost:44324/api/Room/add-room/`, { hallId, blockId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                window.location.reload();
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");

                navigate("/HallAdmin-login");
            }
            else {
                window.alert(error.response.data);
                console.error(error.response.data);
            }
        }
    }

    async function blockHandler(roomId) {
        try {
            const response = await axios.put(`https://localhost:44324/api/Room/update-room-status/${roomId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                window.location.reload();
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");

                navigate("/HallAdmin-login");
            }
            else {
                window.alert(error.response.data);
                console.error(error.response.data);
            }
        }
    }

    async function deleteHandler(roomId) {

        try {
            const response = await axios.delete(`https://localhost:44324/api/Room/delete-room/${roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                window.location.reload();
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");

                navigate("/HallAdmin-login");
            }
            else {
                window.alert(error.response.data);
                console.error(error.response.data);
            }
        }
    }

    useEffect(() => {
        async function getRooms() {
            try {
                const { data } = await axios.get(`https://localhost:44324/api/Block/get-rooms-in-block/${blockId}`);

                setRooms(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");
                    navigate("/hallAdmin-login");
                }
                else {
                    console.log(error.response.data);
                    window.alert(error.response.data);
                }
            }
        }

        getRooms();
    }, [setRooms])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Rooms [ {rooms.length} ]</h3>
                <button onClick={() => addHandler()} className="btn btn-success me-2">Add Room</button>

            </div>

            <div className="row">

                {rooms.length > 0 ? (
                    rooms.map(room => {

                        return <div className="col-md-3 d-flex justify-content-around">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center fs-5">
                                    <h3 className="card-title">Room {room.roomNumber}</h3>
                                    <hr />
                                    <p>Maximum students: {room.maxOccupants}</p>
                                    <p>Available space: {room.maxOccupants}</p>
                                    <hr />
                                    <p>{room.studentCount && room.studentCount !== 0 ? room.studentCount : <span>No</span>} {room.studentCount === 0 && <span>students in room</span>} {room.studentCount === 1 && <span>student in room</span>} {room.studentCount > 1 && <span>students in room</span>}</p>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        {room.isUnderMaintenance === true && <button onClick={() => blockHandler(room.roomId)} className="btn btn-success">UnBlock</button>} {room.isUnderMaintenance === false && <button onClick={() => blockHandler(room.roomId)} className="btn btn-warning">Block</button>}
                                        <button onClick={() => deleteHandler(room.roomId)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="text-center mt-4">
                        <h2>No Rooms</h2>                        
                    </div>

                )}

            </div>
        </div>
    </>
}

export default Rooms;