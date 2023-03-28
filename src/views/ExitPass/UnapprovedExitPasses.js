import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UnapprovedExitPasses = () => {

    const [exitPasses, setExitPasses] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const hallId = user.hallId;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        async function getExitPasses() {

            try {
                const { data } = await axios.get(`https://localhost:44324/api/ExitPass/get-pending-exitPasses`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    }
                );

                setExitPasses(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/hallAdmin-login");
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
                <Link to="/exit-passes"><button className="btn btn-danger">Exit Passes</button></Link>
                <h3>UNAPPROVED EXIT PASSES [ {exitPasses.length} ]</h3>
                <Link to="/approved-exitPass"><button className="btn btn-success">Approved</button></Link>
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
                                <td> <Link to={`/view-exitPass/${exitPass.exitPassId}`}><button className="btn btn-success">View Pass</button></Link></td>
                            </tr>
                        )) : (
                            <>
                                <div className="text-center mt-3">
                                    <h2>No Students are due</h2>
                                </div>
                            </>
                        )
                    }
                </tbody>
            </table>

        </div>
    </>
}

export default UnapprovedExitPasses;