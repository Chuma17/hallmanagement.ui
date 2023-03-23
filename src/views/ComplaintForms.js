import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ComplaintForms = () => {

    const [blocks, setBlocks] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const hallId = user.hallId;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);


    useEffect(() => {
        async function getBlocks() {
            try {
                const { data } = await axios.get(`https://localhost:44324/api/Hall/get-blocks-in-hall/${hallId}`);

                setBlocks(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");
                    navigate("/hallAdmin-login");
                }
                else {
                    console.log(error.response.data);
                    window.alert(error.response.data);
                }
            }
        }

        getBlocks();
    }, [setBlocks])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>SELECT BLOCK [ {blocks.length} ]</h3>
                <Link to="/hallAdmin-dashboard"><button className="btn btn-success">Dashboard</button></Link>
            </div>


            <div className="col container d-flex justify-content-around mt-3">
                <div className="row">

                    {blocks.length > 0 ? (
                        blocks.map(block => {
                            return <div className="col-md-5 container d-flex justify-content-around">
                                <Link to={`/view-complaintRooms/${block.blockId}`}>
                                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                                        <div className="card-body">
                                            <h1 className="card-title"><i className="fa-solid fa-layer-group"></i></h1>
                                            <h3 className="card-text select-text">{block.blockName} Block</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        })) : (

                        <div className="d-flex flex-column">
                            <h2>No blocks</h2>
                            <button className="btn btn-danger w-25" onClick={goBack}>
                                Go Back
                            </button>
                        </div>

                    )
                    }
                </div>

            </div>
        </div>
    </>
}

export default ComplaintForms;