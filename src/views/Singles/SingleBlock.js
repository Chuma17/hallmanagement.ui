import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleBlock = () => {
    let params = useParams();
    const blockId = params.id;
    const user = JSON.parse(localStorage.getItem('user'));

    const [block, setBlock] = useState({});
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

            window.alert(response.data);
            window.location.reload();
            console.log(response);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                console.log(error.response.data);
                window.alert(error.response.data);
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

            window.alert(response.data);
            window.location.reload();
            console.log(response);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/student-login");
            }
            else {
                console.log(error.response.data);
                window.alert(error.response.data);
            }
        }
    }

    useEffect(() => {
        getBlock(blockId);
    }, [blockId])

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        {block && <>

            <section className="bg-dark text-light p-4 mt-5">
                <h4>{block.blockName} Block</h4>
                <h4>{block.roomCount} Rooms</h4>
                <h4>{block.availableRooms} Available Rooms</h4>
                <h6>Students in block: {block.studentCount}</h6>
                <h6>Maximum Students in a Room: {block.roomSpace}</h6>
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

export default SingleBlock;