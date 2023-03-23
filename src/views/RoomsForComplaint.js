import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const RoomsForComplaint = () => {
    let params = useParams();
    const blockId = params.id;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId

    const [rooms, setRooms] = useState([]);

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
                <Link to={`hallAdmin-dashboard`}><button className="btn btn-success me-2">Dashboard</button></Link>

            </div>

            <div className="row">

                {rooms.length > 0 ? (
                    rooms.map(room => {

                        return <div className="col-md-4 d-flex justify-content-around">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center fs-5">
                                    <h3 className="card-title">Room {room.roomNumber}</h3>
                                    <p>{room.studentCount && room.studentCount !== 0 ? room.studentCount : <span>No</span>} {room.studentCount === 0 && <span>students in room</span>} {room.studentCount === 1 && <span>student in room</span>} {room.studentCount > 1 && <span>students in room</span>}</p>
                                    <hr />
                                    <Link to={`/view-complaints/${room.roomId}`}><button className="btn btn-light">View Pass</button></Link>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="d-flex flex-column">
                        <h2>No Rooms</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>

                )}

            </div>
        </div>
    </>
}

export default RoomsForComplaint;