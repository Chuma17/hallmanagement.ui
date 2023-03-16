import { Link } from "react-router-dom";

const StudentDashBoard = () => {

    return <>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Student Dashboard</h1>

        <div className="col container d-flex justify-content-evenly mt-5">

            <div>

                <Link to="/student-devices">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa-solid fa-layer-group"></i></h1>
                            <h3 className="card-text" style={{ textDecoration: "none !important" }}>View Devices</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/selection">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-list"></i></h1>
                            <h3 className="card-text select-text">Start Selection</h3>
                        </div>
                    </div>
                </Link>

            </div>

            <div>

                <Link to="/student-exit-passes">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-users"></i></h1>
                            <h3 className="card-text select-text">Exit Pass</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/student-complaint-form">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-users"></i></h1>
                            <h3 className="card-text select-text">Complaint Form</h3>
                        </div>
                    </div>
                </Link>

            </div>

        </div>

    </>
}

export default StudentDashBoard;