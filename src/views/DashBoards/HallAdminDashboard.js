import { Link } from "react-router-dom";


const HallAdminDashboard = () => {
    return <>
        <div className="col container d-flex justify-content-evenly mt-5">

            <div>

                <Link to="/blocks">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa-solid fa-layer-group"></i></h1>
                            <h3 className="card-text" style={{ textDecoration: "none !important" }}>Blocks & Rooms</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/exit-passes">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-list"></i></h1>
                            <h3 className="card-text select-text">Exit Passes</h3>
                        </div>
                    </div>
                </Link>

            </div>

            <div>

                <Link to="/students">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-users"></i></h1>
                            <h3 className="card-text select-text">Students</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/complaint-forms">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-list"></i></h1>
                            <h3 className="card-text select-text">Complaint Forms</h3>
                        </div>
                    </div>
                </Link>

            </div>

        </div>
    </>
}

export default HallAdminDashboard;