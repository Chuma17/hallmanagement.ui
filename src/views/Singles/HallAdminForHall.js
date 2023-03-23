import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const HallAdminForHall = () => {

    let params = useParams();
    const hallId = params.id;

    const [hallAdmin, setHallAdmin] = useState({});
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getHallAdmin(hallId) {
        try {
            const response = await axios.get(`https://localhost:44324/api/HallAdmin/get-HallAdmin-by-hall/${hallId}`);

            setHallAdmin(response.data);
        } 
        catch (error) {            
            console.error(error);
            return;
        }
    }

    useEffect(() => {
        getHallAdmin(hallId);
    }, [hallId])

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        {hallAdmin &&
            <section className="bg-dark text-light p-4 mt-5">
                <h4>Name: <span>{hallAdmin.firstName ? hallAdmin.firstName : "Nil"}</span> <span>{hallAdmin.lastName}</span></h4>
                <h6>Username: {hallAdmin.userName ? hallAdmin.userName : "Nil"}</h6>
                <h6>Email: {hallAdmin.email ? hallAdmin.email : "Nil"}</h6>
                <h6>Hall Assigned: {hallAdmin.hallName ? hallAdmin.hallName : "Nil"}</h6>
                <hr />
            </section>
        }
    </>
}

export default HallAdminForHall;