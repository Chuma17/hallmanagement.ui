import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StudentExitPass = () => {

    const [exitPasses, setExitPasses] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        async function getExitPasses() {

            try {
                const { data } = await axios.get("https://localhost:44324/api/Students/get-exitPasses",
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.accessToken}`
                        }
                    }
                );

                setExitPasses(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/student-login");
                }
                else {
                    console.error(error);
                }
            }
        }

        getExitPasses();
    }, [setExitPasses]);

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>EXIT PASSES [ {exitPasses.length} ]</h3>
                <Link to="/add-exit-pass"><button className="btn btn-success">Add Exit Pass</button></Link>
            </div>

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Exit Date</th>
                        <th scope="col">Return Date</th>
                        <th scope="col">State of Arrival</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exitPasses.length > 0 ? exitPasses.map((exitPass, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{exitPass.dateOfExit.substring(0, 10)}</td>
                                <td>{exitPass.dateOfReturn.substring(0, 10)}</td>
                                <td>{exitPass.stateOfArrival}</td>
                                <td> <Link to={`/view-student-exitPass/${exitPass.exitPassId}`}><button className="btn btn-success">View Pass</button></Link></td>
                            </tr>
                        )) : (
                            <>
                                <div className="text-center mt-3">
                                    <h2>No Exit Passes</h2>
                                </div>
                            </>
                        )
                    }
                </tbody>
            </table>            
        </div>
    </>
}

export default StudentExitPass;