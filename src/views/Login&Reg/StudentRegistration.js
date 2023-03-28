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

        <section class="ms-auto me-auto">
            <div class="p-5 bg-image" style={{
                backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
                backgroundSize: "cover",
                height: "300px"
            }}
            ></div>

            <div className="container">

                <div class="card col-md-11 mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: "-120px",
                    background: "hsla(0, 0%, 100%, 0.8)",
                    backdropFilter: "blur(30px);"
                }}
                >
                    <div class="card-body py-5 px-md-2">

                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-9">
                                <h2 class="fw-bold mb-5 pb-3 text-center" style={{ letterSpacing: '1px' }}>Student Registration</h2>
                                <form className="form" onSubmit={submitHandler}>

                                    <hr />

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
                                    <hr />

                                    <div className="text-center">

                                        <button type="submit" className="btn btn-dark w-50 btn-block mb-4">
                                            Sign up
                                        </button>
                                    </div>

                                    <p className="mb-2 pb-lg-2 text-center">Already have an account? <Link to="/student-login"
                                        style={{ color: '#393f81' }}>Login here</Link></p>
                                    <p className="mb-2 pb-lg-2 mb-4 text-center"><Link to="/">Go to Home</Link></p>

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