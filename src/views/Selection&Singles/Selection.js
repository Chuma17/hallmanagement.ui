import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Selection.css"
const Selection = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return <>
        <div className="d-flex flex-column">

            <Link to="/student-dashboard"><button className="btn btn-danger mt-5 ms-5">Go Back</button></Link>

            <div className="container d-flex justify-content-around mt-4">

                <Link to="/select-hall">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "20rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i class="fa-solid fa-layer-group"></i></h1>
                            <h3 class="card-text" style={{ textDecoration: "none !important" }}>Halls</h3>
                        </div>
                    </div>
                </Link>


                <Link to="/select-block">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "20rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-list"></i></h1>
                            <h3 class="card-text select-text">Blocks</h3>
                        </div>
                    </div>
                </Link>


                <Link to="/select-room">
                    <div class="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "20rem", height: "15rem" }}>
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-users"></i></h1>
                            <h3 class="card-text select-text">Rooms</h3>
                        </div>
                    </div>
                </Link>

            </div>
        </div>

    </>
}

export default Selection;