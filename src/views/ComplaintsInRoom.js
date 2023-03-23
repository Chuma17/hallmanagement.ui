import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const ComplaintsInRoom = () => {

    let params = useParams();
    const roomId = params.id;

    const [complaints, setComplaints] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    

    useEffect(() => {
        async function getComplaints() {

            try {
                const { data } = await axios.get(`https://localhost:44324/api/ComplaintForm/get-complaints-in-room/${roomId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    }
                );

                setComplaints(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/hallAdmin-login");
                }
                else {
                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }
        }

        getComplaints();
    }, [setComplaints]);

    return <>

        <div className="container ms-auto me-auto mt-3">
            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>COMPLAINTS [ {complaints.length} ]</h3>
                <Link to="/hallAdmin-dashboard"><button className="btn btn-success">Dashboard</button></Link>
            </div>

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Plumbing</th>
                        <th scope="col">Carpentary</th>
                        <th scope="col">Electrical</th>
                        <th scope="col">Others</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        complaints?.map((user, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{user?.plumbing}</td>
                                <td>{user?.carpentary}</td>
                                <td>{user?.electrical}</td>
                                <td>{user?.others}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </>
}

export default ComplaintsInRoom;