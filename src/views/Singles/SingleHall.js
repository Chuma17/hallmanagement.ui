import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleHall = () => {

    let params = useParams();
    const hallId = params.id;

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
            </section>

        </>}
    </>
}

export default SingleHall;