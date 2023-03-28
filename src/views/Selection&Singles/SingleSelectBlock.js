import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleSelectBlock = () => {
    let params = useParams();
    const blockId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [block, setBlock] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getBlock(blockId) {
        try {
            const response = await axios.get(`https://localhost:44324/api/Block/get-single-block/${blockId}`);

            setBlock(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function joinBlock(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/Students/join-block`, { blockId: blockId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.blockId = blockId;
            user.blockName = block.blockName;
            const updatedStudent = JSON.stringify(user);
            localStorage.setItem('user', updatedStudent);

            setSuccess(response.data);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    async function leaveBlock(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`https://localhost:44324/api/Students/leave-block`, {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

            user.blockId = null;
            user.blockName = "empty";
            const updatedStudent = JSON.stringify(user);
            localStorage.setItem('user', updatedStudent);

            setSuccess(response.data);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        getBlock(blockId);
    }, [blockId]);


    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
                window.location.reload();
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                window.location.reload();
            }, 1000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);

    return <>

        {block && <>

            <section className="container bg-dark text-light p-4 mt-5" style={{ borderRadius: "10px", width: '45rem', height: 'fit-content' }}>
                <div className="d-flex justify-content-between">

                    <div >
                        <Link to="/select-block"><button className="btn btn-danger">Go Back</button></Link>
                    </div>
                    <div>
                        <h4>{block.blockName} | Block</h4>
                    </div>
                    <div className="ms-5">

                    </div>
                </div>

                <hr />

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="d-flex justify-content-between">
                    <div>
                        <h4 className="fs-5 mt-5">{block.roomCount} Rooms</h4>
                        <h4 className="fs-5 mt-5 mb-5">{block.availableRooms} Available Rooms</h4>
                    </div>

                    <div>
                        <h4 className="fs-5 mt-5">Students in block: {block.studentCount}</h4>
                        <h4 className="fs-5 mt-5 mb-5">Maximum Students in a Room: {block.roomSpace}</h4>
                    </div>
                </div>

                <hr />

                {user.blockId ? (
                    user.blockId === blockId ? (
                        <button className="btn btn-danger" type="button" onClick={leaveBlock}>
                            Leave Block
                        </button>
                    ) : (
                        <button className="btn btn-secondary" type="button" disabled>
                            Registered in : {user.blockName} Block
                        </button>
                    )
                ) : (
                    <button className="btn btn-success" type="button" onClick={joinBlock}>
                        Join Block
                    </button>
                )}

            </section>
        </>}
    </>
}

export default SingleSelectBlock;