import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleHall = () => {

    let params = useParams();
    const hallId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [hall, setHall] = useState({});
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getHall(hallId) {
        try {
            const response = await axios.get(`https://localhost:44324/api/Hall/get-single-hall/${hallId}`);

            setHall(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function joinHall(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/Students/join-hall`, { hallId: hallId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.hallId = hallId;
            user.hallName = hall.hallName;
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

    async function leaveHall(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`https://localhost:44324/api/Students/leave-hall`, {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.hallId = null;
            user.hallName = "empty";
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
        getHall(hallId);
    }, [hallId])

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        {hall && <>

            <section className="bg-dark text-light p-4 mt-5">
                <h4>{hall.hallName}</h4>
                <h4>{hall.hallType}</h4>
                <h6>Hall Admin: {hall.hallAdminName}</h6>
                <h6>Room Count: {hall.roomCount}</h6>
                <h6>Block Count: {hall.blockCount}</h6>
                <h6>Students in hall: {hall.studentCount}</h6>
                <h6>Available Rooms: {hall.availableRooms}</h6>
                <h6>Maximum Students in a Room: {hall.roomSpace}</h6>
                <hr />

                {user.hallId ? (
                    user.hallId === hallId ? (
                        <button className="btn btn-danger" type="button" onClick={leaveHall}>
                            Leave Hall
                        </button>
                    ) : (
                        <button className="btn btn-secondary" type="button" disabled>
                            Registered in : {user.hallName} Hall
                        </button>
                    )
                ) : (
                    <button className="btn btn-success" type="button" onClick={joinHall}>
                        Join Hall
                    </button>
                )}

            </section>

        </>}
    </>
}

export default SingleHall;