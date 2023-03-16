import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const StudentAccount = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [gender, setGender] = useState(userInfo.gender);
    const [userName, setUserName] = useState(userInfo.userName);
    const [department, setDepartment] = useState(userInfo.department);
    const [course, setCourse] = useState(userInfo.course);


    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`https://localhost:44324/api/Students/update-student`,
                { firstName, lastName, gender, userName, department, course },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    }
                });

            if (response.status === 200) {
                userInfo.firstName = firstName;
                userInfo.lastName = lastName;
                userInfo.gender = gender;
                userInfo.userName = userName;
                userInfo.department = department;
                userInfo.course = course;
                const updatedStudent = JSON.stringify(userInfo);
                localStorage.setItem('user', updatedStudent);

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

            <h3 className="mt-3 mb-3 ms-4">Update Student Account</h3>
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
                <label className="form-label" htmlFor="gender">Gender</label>
                <input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    required
                    className="form-control"
                />
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
                Update
            </button>

        </form>
    </>
}

export default StudentAccount;