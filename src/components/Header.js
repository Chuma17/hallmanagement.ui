import { Link, useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const Logout = async e => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem("user");
            navigate("/");
        }
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">HMS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">

                {!userInfo &&
                    <div className="d-flex justify-content-between mt-2">

                        <Link to="/student-login" className="nav-link"> <p className=" text-light">Student</p> </Link>

                        <Link to="/hallAdmin-login" className="nav-link"><p className=" text-light">Hall Admin</p></Link>

                        <Link to="/chiefHallAdmin-login" className="nav-link"><p className=" text-light">Chief Hall Admin</p></Link>

                        <Link to="/porter-login" className="nav-link"><p className=" text-light">Porter</p></Link>

                    </div>
                }

                <div className="d-flex">

                    {userInfo &&
                        <Link to={`/edit-account/${userInfo.studentId}`} className="nav-link"> <button className="btn btn-outline-success p-3 m-auto text-light"> <i className="fas fa-user"></i> Hi, {userInfo.userName}</button></Link>
                    }

                    {userInfo && userInfo.role === "Student" ? (
                        <Link to="/student-dashboard" className="nav-link m-auto"> <button className="btn btn-outline-danger p-2 text-light"> Dashboard</button></Link>
                    ) :

                        userInfo && userInfo.role === "HallAdmin" ? (
                            <Link to="/hallAdmin-dashboard" className="nav-link m-auto"> <button className="btn btn-outline-danger p-2 text-light"> Dashboard</button></Link>
                        ) :

                            userInfo && userInfo.role === "ChiefHallAdmin" ? (
                                <Link to="/chiefHallAdmin-dashboard" className="nav-link m-auto"> <button className="btn btn-outline-danger p-2 text-light"> Dashboard</button></Link>
                            ) :

                                userInfo && userInfo.role === "Porter" && (
                                    <Link to="/porter-dashboard" className="nav-link m-auto"> <button className="btn btn-outline-success p-2 text-light"> DashBoard</button></Link>
                                )
                    }
                </div>


                <div className="d-flex">

                    {userInfo && userInfo.role === "HallAdmin" && (
                        <div className="nav-item p-2 m-auto">
                            {userInfo.hallId ? (                                
                                    <button className="btn btn-success text-light m-auto" disabled={!userInfo.hallId}>
                                        Hall : {userInfo.hallName !== "empty" && userInfo.hallName}
                                        {userInfo.hallName === "empty" && <span>NA</span>}
                                    </button>
                            ) : (
                                <button className="btn btn-secondary text-light m-auto" disabled>
                                    Hall : {userInfo.hallName !== "empty" && userInfo.hallName}
                                    {userInfo.hallName === "empty" && <span>NA</span>}
                                </button>
                            )}
                        </div>
                    )}

                    {userInfo && userInfo.role === "Student" && (
                        <div className="nav-item p-2 m-auto">
                            {userInfo.hallId ? (
                                <Link to={`/view-select-hall/${userInfo.hallId}`}>
                                    <button className="btn btn-success text-light m-auto" disabled={!userInfo.hallId}>
                                        Hall : {userInfo.hallName !== "empty" && userInfo.hallName}
                                        {userInfo.hallName === "empty" && <span>NA</span>}
                                    </button>
                                </Link>
                            ) : (
                                <button className="btn btn-secondary text-light m-auto" disabled>
                                    Hall : {userInfo.hallName !== "empty" && userInfo.hallName}
                                    {userInfo.hallName === "empty" && <span>NA</span>}
                                </button>
                            )}
                        </div>
                    )}

                    {userInfo && userInfo.role === "Student" && (
                        <div className="nav-item p-2 m-auto">
                            {userInfo.blockId ? (
                                <Link to={`/view-select-block/${userInfo.blockId}`}>
                                    <button className="btn btn-success text-light m-auto">
                                        Block : {userInfo.blockName !== "empty" && userInfo.blockName}
                                        {userInfo.blockName === "empty" && <span>NA</span>}
                                    </button>
                                </Link>
                            ) : (
                                <button className="btn btn-secondary text-light m-auto" disabled>
                                    Block : {userInfo.blockName !== "empty" && userInfo.blockName}
                                    {userInfo.blockName === "empty" && <span>NA</span>}
                                </button>
                            )}
                        </div>
                    )}

                    {userInfo && userInfo.role === "Student" && (
                        <div className="nav-item p-2 m-auto">
                            {userInfo.roomId ? (
                                <Link to={`/view-select-room/${userInfo.roomId}`}>
                                    <button className="btn btn-success text-light m-auto" disabled={!userInfo.roomId}>
                                        Room : {userInfo.roomNumber !== "empty" && userInfo.roomNumber}
                                        {userInfo.roomNumber === "empty" && <span>NA</span>}
                                    </button>
                                </Link>
                            ) : (
                                <button className="btn btn-secondary text-light m-auto" disabled>
                                    Room : {userInfo.roomNumber !== "empty" && userInfo.roomNumber}
                                    {userInfo.roomNumber === "empty" && <span>NA</span>}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="d-flex">

                    {userInfo && userInfo.role === "Student" && (
                        <Link to="/notifications" className="nav-link m-auto"> <button className="btn btn-outline-success text-light"><i class="fa-solid fa-bell"></i></button></Link>
                    )}

                    {userInfo && userInfo.role === "HallAdmin" && (
                        <Link to="/hallAdmin-notifications" className="nav-link m-auto"> <button className="btn btn-outline-success text-light"><i class="fa-solid fa-bell"></i></button></Link>
                    )}

                    {userInfo &&
                        <button className="btn btn-outline-danger my-2 my-sm-0 me-4 text-light" onClick={Logout}> <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Sign Out</button>
                    }
                </div>

            </div>

        </nav>
    </>
}

export default Header;