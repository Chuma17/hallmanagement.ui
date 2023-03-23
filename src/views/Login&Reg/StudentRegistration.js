import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
    const [gender, setGender] = useState("");
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [course, setCourse] = useState("");

    let male = "Male";
    let female = "Female";

    async function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`https://localhost:44324/api/Students/student-registration`,
                { firstName, lastName, matricNo, email, password, studyLevel, gender, userName, department, course },
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

        <section className="background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-8 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>



                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example1">First name</label>
                                                <input type="text" id="form3Example1" maxLength={15} value={firstName} onChange={e => setFirstName(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example2">Last name</label>
                                                <input type="text" id="form3Example2" maxLength={15} value={lastName} onChange={e => setLastName(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-6 mb-4">
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

                                        <div className="col-md-6">
                                            <div className=" mb-4">
                                                <label className="form-label" htmlfor="form3Example5">Matric No</label>
                                                <input type="text" id="form3Example4" maxLength={20} minLength={4} value={matricNo} onChange={e => setMatricNo(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example4">Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className=" mb-4">
                                                <label className="form-label" htmlfor="form3Example5">Confirm Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
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

                                        <div className="col-md-6 mb-4">
                                            <label className="form-label" htmlFor="gender">Gender</label>
                                            <select className="custom-select form-control"
                                                value={gender}
                                                onChange={(event) => setGender((event.target.value))}
                                            >
                                                <option value={male}>Male</option>
                                                <option value={female}>Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="">
                                            <label className="form-label" htmlfor="form3Example3">Email address</label>
                                            <input type="email" id="form3Example3" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
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

                                        <div className="col-md-6 mb-4">
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
                                    </div>

                                    <button type="submit" className="btn btn-dark btn-outline-danger btn-block mb-4">
                                        Sign up
                                    </button>

                                    <p className="mb-2 pb-lg-2 text-center">Already have an account? <Link to="/student-login"
                                        style={{ color: '#393f81' }}>Login here</Link></p>

                                    <div className="text-center">
                                        <p>or sign up with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-github"></i>
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

export default StudentRegistration;