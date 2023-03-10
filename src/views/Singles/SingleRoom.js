import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleRoom = () => {
    let params = useParams();
    const roomId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [room, setRoom] = useState({});
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

            window.alert(response.data);
            window.location.reload();
            console.log(response);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                console.log(error.response.data);
                window.alert(error.response.data);
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

            window.alert(response.data);
            window.location.reload();
            console.log(response);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                console.log(error.response.data);
                window.alert(error.response.data);
            }
        }
    }

    useEffect(() => {
        getRoom(roomId);
    }, [roomId])

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        {room && <>

            <section className="bg-dark text-light p-4 mt-5">
                <h4>Room {room.roomNumber}</h4>
                <h4>Maximum students: {room.maxOccupants}</h4>
                <h4>Available Space: {room.availableSpace} </h4>
                <h6>Students in the room: {room.studentCount}</h6>
                <h6>Room Full: {room.isFull === true && <span>Yes</span>} {room.isFull === false && <span>No</span>}</h6>
                <h6>Room Available: {room.isUnderMaintenance === true && <span>No</span>} {room.isUnderMaintenance === false && <span>Yes</span>}</h6>
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

export default SingleRoom;