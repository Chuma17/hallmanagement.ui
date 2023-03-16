import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddComplaintForm = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));

    const [plumbing, setPlumbing] = useState("");
    const [carpentary, setCarpentary] = useState("");
    const [electrical, setElectrical] = useState("");
    const [others, setOthers] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`https://localhost:44324/api/ComplaintForm/add-complaintForm`,
                { plumbing, carpentary, electrical, others },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });            

                if (response.status === 200) {
                    window.alert(response.data);
                    navigate("/student-dashboard")
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

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">File Complaint Form</h3>
            <hr />

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="plumbing">Plumbing</label>
                <input
                    type="text"
                    id="plumbing"
                    value={plumbing}
                    onChange={e => setPlumbing(e.target.value)}                    
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="carpentary">Carpentary</label>
                <input
                    type="text"
                    id="carpentary"
                    value={carpentary}
                    onChange={e => setCarpentary(e.target.value)}                    
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="electrical">Electrical</label>
                <input
                    type="text"
                    id="electrical"
                    value={electrical}
                    onChange={e => setElectrical(e.target.value)}                    
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="others">Others</label>
                <input
                    type="text"
                    id="others"
                    value={others}
                    onChange={e => setOthers(e.target.value)}                    
                    className="form-control"
                />
            </div>

            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                Submit
            </button>

        </form>
    </>
}

export default AddComplaintForm;