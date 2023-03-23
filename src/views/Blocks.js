import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Blocks = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId;

    const [blocks, setBlocks] = useState([]);    

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
        <div style={{ borderRadius: "10px" }} className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Blocks [ {blocks.length} ]</h3>
                <Link to="/add-block"><button className="btn btn-success me-2">Add Block</button></Link>

            </div>

            <div className="row">

                {blocks.length > 0 ? (
                    blocks.map(block => {

                        return <div className="col-md-4 d-flex justify-content-around">

                            <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                <div className="card-body text-center fs-5">
                                    <h3 className="card-title">{block.blockName} Block</h3>
                                    <hr />
                                    <p>{block.roomCount && block.roomCount !== 0 ? block.roomCount : <span>No</span>} {block.roomCount === 0 && <span>rooms</span>} {block.roomCount === 1 && <span>room</span>} {block.roomCount > 1 && <span>rooms</span>} </p>
                                    <p>{block.roomSpace} in a room</p>
                                    <p>{block.studentCount && block.studentCount !== 0 ? block.studentCount : <span>No</span>} {block.studentCount === 0 && <span>students</span>} {block.studentCount === 1 && <span>student</span>} {block.studentCount > 1 && <span>students</span>}</p>                                    
                                    <Link to={`/view-rooms-in-block/${block.blockId}`}><button className="btn btn-light">View Rooms</button></Link>
                                </div>
                            </div>
                        </div>
                    })

                ) : (

                    <div className="d-flex flex-column">
                        <h2>No Blocks</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>

                )}                

            </div>
        </div>
    </>
}

export default Blocks;