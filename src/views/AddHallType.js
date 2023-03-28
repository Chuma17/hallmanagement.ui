import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddHallType = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [description, setDescription] = useState("");
    const [roomSpaceCount, setRoomSpaceCount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/HallType/add-hallType`,
                { description, roomSpaceCount },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                setSuccess(response.data);
            }
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/chiefHallAdmin-login");
            }
            else {
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                navigate("/hall-types")
            }, 1000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);

    return <>
        <section className="background-radial-gradient overflow-hidden">

            <div className="container px-4 py-2 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-6 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <button className="btn btn-danger mb-3" onClick={goBack}>Go Back</button>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>
                                    <h5 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Add new Hall Type</h5>

                                    {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                    {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="itemDescription">Description</label>
                                        <input
                                            type="text"
                                            id="itemDescription"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="roomSpace">Room Space Count</label>
                                        <input
                                            type="text"
                                            id="roomSpace"
                                            value={roomSpaceCount}
                                            onChange={e => setRoomSpaceCount(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="text-center">

                                        <button type="submit" className="btn btn-dark w-25 btn-block mb-4">
                                            Add
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>        
    </>
}

export default AddHallType;