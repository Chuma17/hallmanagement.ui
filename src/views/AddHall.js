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
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">Add new hall</h3>
            <hr />

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

            <div className="mb-4">
                <label className="form-label" htmlfor="hallType">Hall Type</label>
                <select value={hallTypeId} onChange={e => setHallTypeId(e.target.value)} required class="form-control form-select">
                    <option hidden value="">--- Select Hall Type ---</option>

                    {hallTypes.length > 0 && hallTypes.map(hallType1 => {
                        return <option key={hallType1.hallTypeId} value={hallType1.hallTypeId}> {hallType1.description} </option>
                    })}
                </select>
            </div>
            

            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                Add
            </button>

        </form>
    </>
}

export default AddHall;