import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
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

                <Link to={`/hallAdmin-for-fall/${hallId}`}><button className="btn btn-success">View Hall Admin</button></Link>

            </section>            

        </>}
    </>
}

export default SingleHall;