import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddHall = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [hallName, setHallName] = useState("");
    const [hallTypeId, setHallTypeId] = useState([]);
    const [hallTypes, setHallTypes] = useState([]);

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/Hall/add-hall`,
                { hallName, hallTypeId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                window.alert(response.data);
                navigate("/halls")
            }

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
        async function getHallTypes() {
            const { data } = await axios.get("https://localhost:44324/api/HallType/get-all-hallTypes");
            setHallTypes(data);
        }

        getHallTypes();
    }, [setHallTypes])


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
                                    <h5 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Add new hall</h5>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlFor="hallName">Hall Name</label>
                                        <input
                                            type="text"
                                            id="hallName"
                                            value={hallName}
                                            onChange={e => setHallName(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-4 me-4 ms-4">
                                        <label className="form-label" htmlfor="hallType">Hall Type</label>
                                        <select value={hallTypeId} onChange={e => setHallTypeId(e.target.value)} required className="form-control form-select">
                                            <option hidden value="">--- Select Hall Type ---</option>

                                            {hallTypes.length > 0 && hallTypes.map(hallType1 => {
                                                return <option key={hallType1.hallTypeId} value={hallType1.hallTypeId}> {hallType1.description} </option>
                                            })}
                                        </select>
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

export default AddHall;