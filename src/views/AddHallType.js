import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddHallType = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [description, setDescription] = useState("");
    const [roomSpaceCount, setRoomSpaceCount] = useState("");

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
                    window.alert(response.data);
                    navigate("/hall-types")
                }
            
            window.location.reload();
            console.log(response);
        }

        catch (error) {
            if (error.response.status === 401) {
                window.alert("Your session has expired. Login again!");
                localStorage.removeItem("user");
                navigate("/chiefHallAdmin-login");
            }
            else {
                console.log(error.response.data);
                window.alert(error.response.data);
            }
        }
    }

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">Add new Hall Type</h3>
            <hr />            

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

            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                Add
            </button>

        </form>
    </>
}

export default AddHallType;