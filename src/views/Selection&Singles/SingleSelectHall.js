import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleSelectHall = () => {

    let params = useParams();
    const hallId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [hall, setHall] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        getHall(hallId);
    }, [hallId])


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

        {hall && <>

            <section className="container bg-dark text-light p-4 mt-5" style={{ borderRadius: "10px", width: '50rem', height: 'fit-content' }}>
                <div className="d-flex justify-content-between">

                    <div >
                        <Link to="/select-hall"><button className="btn btn-danger">Go Back</button></Link>
                    </div>
                    <div>
                        <h4 className="">{hall.hallType} | {hall.hallName}</h4>
                    </div>
                    <div className="ms-5">

                    </div>
                </div>

                <hr />

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="fs-5 mt-5">Hall Admin : {hall.hallAdminName}</h6>
                        <h6 className="fs-5 mt-5">Room Count : {hall.roomCount}</h6>
                        <h6 className="fs-5 mt-5 mb-5">Block Count : {hall.blockCount}</h6>
                    </div>

                    <div>
                        <h6 className="fs-5 mt-5">Students in hall : {hall.studentCount}</h6>
                        <h6 className="fs-5 mt-5">Available Rooms : {hall.availableRooms}</h6>
                        <h6 className="fs-5 mt-5 mb-5">Maximum Students in a Room : {hall.roomSpace}</h6>
                    </div>
                </div>

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

export default SingleSelectHall;