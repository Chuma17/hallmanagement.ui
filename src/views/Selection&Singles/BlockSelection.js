import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BlockSelection = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId;
    const goBack = () => navigate(-1);

    const [blocks, setBlocks] = useState([]);

    async function getBlocks() {
        try {
            if (!hallId) {
                throw new Error("Hall ID is not set");
            }
            else {
                const { data } = await axios.get(`https://localhost:44324/api/Hall/get-blocks-in-hall/${hallId}`);
                setBlocks(data);
            }

        }
        catch (error) {
            console.log(`Error fetching blocks: ${error.message}`);
        }
    }
    useEffect(() => {
        getBlocks();
    }, [hallId])


    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex bg-dark justify-content-between p-4 text-light">
                <Link to="/selection"><button className="btn btn-danger">Go Back</button></Link>
                <h3>Blocks [ {blocks.length} ]</h3>
                <Link to="/select-room"><button className="btn btn-success">Select Room</button></Link>
            </div>

            <div className="row">

                {hallId !== null ? (
                    blocks.length > 0 ? (
                        blocks.map(block => {
                            <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

                            return <div className="col-md-4 d-flex justify-content-around">

                                <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                    <div className="card-body text-center fs-5">
                                        <h3 className="card-title">{block.blockName} block</h3>
                                        <hr />

                                        <p style={{ textAlign: "left" }}>Room count: {block.roomCount}</p>
                                        <p style={{ textAlign: "left" }}>Available Rooms: {block.availableRooms} </p>
                                        <p style={{ textAlign: "left" }}>Students in the block: {block.studentCount} </p>

                                        <hr />
                                        <Link to={`/view-select-block/${block.blockId}`}><button className="btn btn-light">View Block</button></Link>
                                    </div>
                                </div>
                            </div>
                        })

                    ) : (

                        <div className="d-flex flex-column">
                            <h2>No blocks are in this hall</h2>
                            <button className="btn btn-danger w-25" onClick={goBack}>
                                Go Back
                            </button>
                        </div>
                    )

                ) : (

                    <div className="d-flex flex-column">
                        <h2>Select a hall first</h2>
                        <button className="btn btn-danger w-25" onClick={goBack}>
                            Go Back
                        </button>
                    </div>
                )}

            </div>
        </div >
    </>
}

export default BlockSelection;