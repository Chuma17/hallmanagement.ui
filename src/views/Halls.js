import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Halls = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [halls, setHalls] = useState([]);

    async function deleteHandler(hallId) {
        if (window.confirm('Confirm delete?')) {

            try {
                const response = await axios.delete(`https://localhost:44324/api/Hall/delete-hall/${hallId}`,
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

                    navigate("/chiefHallAdmin-login");
                }
                else {
                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }
        }
    }

    useEffect(() => {
        async function getHalls() {
            try {
                const { data } = await axios.get("https://localhost:44324/api/Hall/get-halls-by-gender",
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });

                setHalls(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");
                    navigate("/chiefHallAdmin-login");
                }
                else {
                    console.log(error.response.data);
                    window.alert(error.response.data);
                }
            }
        }

        getHalls();
    }, [setHalls])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Halls [ {halls.length} ]</h3>
                <Link to="/add-hall"><button className="btn btn-success me-2">Add Hall</button></Link>

            </div>

            <div className="row">

                {halls.length > 0 ? (
                    halls.map(hall => {

                        return <div className="col-md-4 d-flex justify-content-around">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center fs-5">
                                    <h3 className="card-title">{hall.hallName}</h3>
                                    <hr />
                                    <p>{hall.roomCount && hall.roomCount !== 0 ? hall.roomCount : <span>No</span>} {hall.roomCount === 0 && <span>rooms</span>} {hall.roomCount === 1 && <span>room</span>} {hall.roomCount > 1 && <span>rooms</span>} </p>
                                    <p>{hall.roomSpace} in a room</p>
                                    <p>{hall.studentCount && hall.studentCount !== 0 ? hall.studentCount : <span>No</span>} {hall.studentCount === 0 && <span>students</span>} {hall.studentCount === 1 && <span>student</span>} {hall.studentCount > 1 && <span>students</span>}</p>
                                    <p>Is Assigned : {hall.isAssigned === true && <span>Yes</span>} {hall.isAssigned === false && <span>No</span>}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/view-hall/${hall.hallId}`}> <button className="btn btn-success">View</button></Link>
                                        <button onClick={() => deleteHandler(hall.hallId)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="d-flex flex-column">
                        <h2>No halls</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>

                )}                

            </div>
        </div>
    </>
}

export default Halls;