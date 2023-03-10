import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddExitPass = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [dateOfExit, setDateOfExit] = useState("");
    const [stateOfArrival, setStateOfArrival] = useState("");
    const [address, setAddress] = useState("");
    const [reasonForLeaving, setReasonForLeaving] = useState("");
    const [dateOfReturn, setDateOfReturn] = useState("");    

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/ExitPass/add-exitPass`,
                { dateOfExit, stateOfArrival, address, reasonForLeaving, dateOfReturn },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                window.alert(response.data);
                navigate("/student-exit-passes")
            }

            // window.location.reload();
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

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">File a new Exit Pass</h3>
            <hr />

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="itemAddress">Date of Exit</label>
                <input
                    type="date"
                    id="itemAddress"
                    value={dateOfExit}
                    onChange={e => setDateOfExit(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="itemColor">State of Arrival</label>
                <input
                    type="text"
                    id="itemColor"
                    value={stateOfArrival}
                    onChange={e => setStateOfArrival(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="itemDescription">Address</label>
                <textarea
                    type="text"
                    rows={3}
                    id="itemDescription"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="itemSerialNo">Reason for leaving</label>
                <textarea
                    type="text"
                    rows={3}
                    id="itemSerialNo"
                    value={reasonForLeaving}
                    onChange={e => setReasonForLeaving(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="SerialNo">Date of Return</label>
                <input
                    type="date"
                    id="SerialNo"
                    value={dateOfReturn}
                    onChange={e => setDateOfReturn(e.target.value)}
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

export default AddExitPass;