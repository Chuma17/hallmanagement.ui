import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ExitPasses = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <Link to="/hallAdmin-dashboard"><button className="btn btn-danger">Go Back</button></Link>
                <h3>EXIT PASSES MENU</h3>
                <Link to="/all-exitPasses"><button className="btn btn-success">All Passes</button></Link>
            </div>

            <div className="col container d-flex justify-content-evenly mt-5">

                <div>

                    <Link to="/approved-exitPass">
                        <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                            <div className="card-body">
                                <h1 className="card-title"><i className="fa-solid fa-layer-group"></i></h1>
                                <h3 className="card-text" style={{ textDecoration: "none !important" }}>Approved</h3>
                            </div>
                        </div>
                    </Link>

                    <Link to="/pending-exitPass">
                        <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                            <div className="card-body">
                                <h1 className="card-title"><i className="fa fa-list"></i></h1>
                                <h3 className="card-text select-text">Pending</h3>
                            </div>
                        </div>
                    </Link>

                </div>

                <div>

                    <Link to="/students-overdue">
                        <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                            <div className="card-body">
                                <h1 className="card-title"><i className="fa fa-users"></i></h1>
                                <h3 className="card-text select-text">Students Overdue</h3>
                            </div>
                        </div>
                    </Link>

                    <Link to="/students-due">
                        <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                            <div className="card-body">
                                <h1 className="card-title"><i className="fa fa-users"></i></h1>
                                <h3 className="card-text select-text">Students Due</h3>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    </>
}

export default ExitPasses;