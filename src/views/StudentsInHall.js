import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const StudentsInHall = () => {

    const [students, setStudents] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const hallId = user.hallId;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    

    useEffect(() => {
        async function getStudents() {

            try {
                const { data } = await axios.get(`https://localhost:44324/api/Hall/get-students-in-hall/${hallId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    }
                );

                setStudents(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/hallAdmin-login");
                }
                else {
                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }
        }

        getStudents();
    }, [setStudents]);

    return <>

        <div className="container ms-auto me-auto mt-3">
            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>STUDENTS [ {students.length} ]</h3>
                <Link to="/view-blocked-students"><button className="btn btn-success">View Blocked</button></Link>
            </div>

            <table className="table table-striped mt-4 fs-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Study Level</th>
                        <th scope="col">Department</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students?.map((user, i) => (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{user?.firstName}</td>
                                <td>{user?.lastName}</td>
                                <td>{user?.studyLevel}</td>
                                <td>{user?.department}</td>
                                <td> <Link to={`/view-student/${user.studentId}`}> <button className="btn btn-sm btn-success text-light">View Student</button></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </>
}

export default StudentsInHall;