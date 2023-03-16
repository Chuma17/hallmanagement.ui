import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const HallTypes = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [hallTypes, setHallTypes] = useState([]);

    async function deleteHandler(hallTypeId) {
        if (window.confirm('Confirm delete?')) {

            try {
                const response = await axios.delete(`https://localhost:44324/api/HallType/delete-hallType/${hallTypeId}`,
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
        async function getHallTypes() {
            const { data } = await axios.get("https://localhost:44324/api/HallType/get-all-hallTypes");
            setHallTypes(data);
        }

        getHallTypes();
    }, [setHallTypes])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Hall Types [ {hallTypes.length} ]</h3>
                <Link to="/add-hall-type"><button className="btn btn-success">Add</button></Link>
            </div>

            <div className="row">

                {hallTypes && hallTypes.map(hallType => {

                    return <div className="col-md-4 d-flex justify-content-around">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                            <div className="card-body text-center fs-5">
                                <h3 className="card-title">{hallType.description}</h3>
                                <hr />
                                <p>Hall count: {hallType.hallCount}</p>
                                <p>{hallType.roomSpaceCount} in a room</p>
                                <button onClick={() => deleteHandler(hallType.hallTypeId)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </>
}

export default HallTypes;