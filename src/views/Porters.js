import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Porters = () => {

    const [porter, setPorter] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function deleteHandler(porterId) {
        if (window.confirm('Confirm delete?')) {

            try {
                const response = await axios.delete(`https://localhost:44324/api/Porter/delete-porter/${porterId}`,
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
        async function getPorters() {

            try {
                const { data } = await axios.get("https://localhost:44324/api/Porter/get-Porters-by-gender",
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    }
                );

                setPorter(data);
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

        getPorters();
    }, [setPorter]);

    return <>

        <div className="container ms-auto me-auto mt-3">
            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>PORTERS [ {porter.length} ]</h3>
                <Link to="/add-porter"><button className="btn btn-success">Add Porter</button></Link>
            </div>

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hall Assigned</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        porter?.map((user, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{user?.firstName}</td>
                                <td>{user?.lastName}</td>
                                <td>{user?.email}</td>
                                <td>{user?.hallName}</td>
                                <td><button onClick={() => deleteHandler(user.porterId)} className="btn btn-danger btn-sm">Delete Account</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </>
}

export default Porters;