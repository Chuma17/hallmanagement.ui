import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const StudentRegistration = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [matricNo, setMatricNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studyLevel, setStudyLevel] = useState(100);
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [course, setCourse] = useState("");


    async function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`https://localhost:44324/api/Students/student-registration`,
                { firstName, lastName, matricNo, email, password, studyLevel, dob, gender, userName, department, course },
            );

            if (response.status === 200) {
                window.alert(response.data);
                navigate("/student-login")
            }

            window.location.reload();
            console.log(response);
        }

        catch (error) {
            console.log(error.response.data);
            window.alert(error.response.data);
        }
    }


    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        <form className="login-form form w-75s" onSubmit={submitHandler}>

            <h3 className="mt-3 mb-3 ms-4">Register Student Account</h3>
            <hr />

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="matricNoAddress">Matric Number</label>
                <input
                    type="text"
                    id="matricNoAddress"
                    value={matricNo}
                    onChange={e => setMatricNo(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="studyLevel">Study Level</label>
                <select className="custom-select form-control"
                    value={studyLevel}
                    onChange={(event) => setStudyLevel(parseInt(event.target.value))}
                >
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={300}>300</option>
                    <option value={400}>400</option>
                    <option value={500}>500</option>
                    <option value={600}>600</option>
                </select>
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select className="custom-select form-control"
                    value={gender}
                    onChange={(event) => setGender((event.target.value))}
                >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                </select>
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="department">Department</label>
                <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    required
                    className="form-control"
                />
            </div>

            <div className="mb-4 me-4 ms-4">
                <label className="form-label" htmlFor="course">Course</label>
                <input
                    type="text"
                    id="course"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
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

export default StudentRegistration;