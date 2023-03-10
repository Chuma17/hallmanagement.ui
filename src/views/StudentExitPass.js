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

            <div className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>EXIT PASSES [ {exitPasses.length} ]</h3>
                <Link to="/add-exit-pass"><button className="btn btn-success">Add Exit Pass</button></Link>
            </div>

            <div className="row">

                {exitPasses.length > 0 ? (
                    exitPasses.map(exitPass => {

                        return <div className="col-4 d-flex justify-content-around">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center">
                                    <p>Exit Date : {exitPass.dateOfExit.substring(0, 10)}</p>
                                    <p>Return Date : {exitPass.dateOfReturn.substring(0, 10)}</p>
                                    <p>State : {exitPass.stateOfArrival}</p>
                                    <hr />
                                    <Link to={`/view-exitPass/${exitPass.exitPassId}`}><button className="btn btn-light">View Pass</button></Link>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="d-flex flex-column">
                        <h2>No Exit Passes</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>
                )}

            </div>
        </div>
    </>
}

export default StudentExitPass;