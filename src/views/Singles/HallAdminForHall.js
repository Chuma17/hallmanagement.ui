import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
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

        {hallAdmin &&
            <section className="container bg-dark text-light p-4 mt-5" style={{ borderRadius: "10px", width: '50rem', height: 'fit-content' }}>
                <div className="d-flex justify-content-between">

                    <div >
                        <Link to="/select-hall"><button className="btn btn-danger">Go Back</button></Link>
                    </div>
                    <div className="ms-5">

                    </div>
                    <div className="ms-5">

                    </div>
                </div>

                <hr />

                <div>

                    <h6 className="fs-5 mt-5">Name: <span>{hallAdmin.firstName ? hallAdmin.firstName : "Nil"}</span> <span>{hallAdmin.lastName}</span></h6>
                    <h6 className="fs-5 mt-5">Username: {hallAdmin.userName ? hallAdmin.userName : "Nil"}</h6>
                    <h6 className="fs-5 mt-5">Email: {hallAdmin.email ? hallAdmin.email : "Nil"}</h6>
                    <h6 className="fs-5 mt-5 mb-5">Hall Assigned: {hallAdmin.hallName ? hallAdmin.hallName : "Nil"}</h6>

                </div>
                
            </section>
        }
    </>
}

export default HallAdminForHall;