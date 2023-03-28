import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleSelectRoom = () => {
    let params = useParams();
    const roomId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [room, setRoom] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getRoom(roomId) {
        try {
            const response = await axios.get(`https://localhost:44324/api/Room/get-single-room/${roomId}`);

            setRoom(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function joinRoom(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/Students/join-room`, { roomId: roomId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.roomId = roomId;
            user.roomNumber = room.roomNumber;
            const updatedStudent = JSON.stringify(user);
            localStorage.setItem('user', updatedStudent);

            setSuccess(response.data);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    async function leaveRoom(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`https://localhost:44324/api/Students/leave-room`, {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.roomId = null;
            user.roomNumber = "empty";
            const updatedStudent = JSON.stringify(user);
            localStorage.setItem('user', updatedStudent);

            setSuccess(response.data);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        getRoom(roomId);
    }, [roomId]);

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
                window.location.reload();
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                window.location.reload();
            }, 1000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);

    return <>

        {room && <>
            <section className="container bg-dark text-light p-4 mt-5" style={{ borderRadius: "10px", width: '45rem', height: 'fit-content' }}>
                <div className="d-flex justify-content-between">

                    <div >
                        <Link to="/select-room"><button className="btn btn-danger">Go Back</button></Link>
                    </div>
                    <div>
                        <h4>Room | {room.roomNumber}</h4>
                    </div>
                    <div className="ms-5">

                    </div>
                </div>

                <hr />

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="d-flex justify-content-between">
                    <div>
                        <h4 className="fs-5 mt-5">Room {room.roomNumber}</h4>
                        <h4 className="fs-5 mt-5">Maximum students: {room.maxOccupants}</h4>
                        <h4 className="fs-5 mt-5 mb-5">Available Space: {room.availableSpace} </h4>
                    </div>

                    <div>
                        <h6 className="fs-5 mt-5">Students in the room: {room.studentCount}</h6>
                        <h6 className="fs-5 mt-5">Room Full: {room.isFull === true && <span>Yes</span>} {room.isFull === false && <span>No</span>}</h6>
                        <h6 className="fs-5 mt-5 mb-5">Room Available: {room.isUnderMaintenance === true && <span>No</span>} {room.isUnderMaintenance === false && <span>Yes</span>}</h6>

                    </div>
                </div>

                <hr />

                {user.roomId ? (
                    user.roomId === roomId ? (
                        <button className="btn btn-danger" type="button" onClick={leaveRoom}>
                            Leave Room
                        </button>
                    ) : (
                        <button className="btn btn-secondary" type="button" disabled>
                            Registered in : Room {user.roomNumber}
                        </button>
                    )
                ) : (
                    <button className="btn btn-success" type="button" onClick={joinRoom}>
                        Join Room
                    </button>
                )}

            </section>
        </>}
    </>
}

export default SingleSelectRoom;