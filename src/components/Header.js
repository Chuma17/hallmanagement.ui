import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const Logout = async e => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem("user");
            navigate("/");
        }
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    {!userInfo && <li className="nav-item">
                        <Link to="/student-login" className="nav-link" href="/">Student</Link>
                    </li>}

                    {!userInfo &&<li className="nav-item">
                        <Link to="/hallAdmin-login" className="nav-link" href="/">Hall Admin</Link>
                    </li>}

                    {!userInfo &&<li className="nav-item">
                        <Link to="/chiefHallAdmin-login" className="nav-link" href="/">Chief Hall Admin</Link>
                    </li>}

                    {!userInfo &&<li className="nav-item">
                        <Link to="/porter-login" className="nav-link" href="/">Porter</Link>
                    </li>}

                    {userInfo && <li class="nav-item btn-outline-danger acct-name p-1 m-auto">
                        <a class="nav-link active " aria-current="page"> <i className="fas fa-user"></i> {userInfo && userInfo.userName}</a>
                    </li>}

                    {userInfo &&
                        <button className="btn header-button my-2 my-sm-0 me-4 text-light" onClick={Logout}> <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Sign Out</button>
                    }
                </ul>
            </div>
        </nav>
    </>
}

export default Header;