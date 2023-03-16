import { Link } from "react-router-dom";


const ChiefHallAdminDashboard = () => {
    return <>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Chief Hall Admin Dashboard</h1>

        <div className="col container d-flex justify-content-evenly mt-5">

            <div>

                <Link to="/hall-types">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa-solid fa-layer-group"></i></h1>
                            <h3 className="card-text" style={{ textDecoration: "none !important" }}>Hall Types</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/halls">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-list"></i></h1>
                            <h3 className="card-text select-text">Halls</h3>
                        </div>
                    </div>
                </Link>

            </div>

            <div>

                <Link to="/hall-admins">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-users"></i></h1>
                            <h3 className="card-text select-text">Hall Admins</h3>
                        </div>
                    </div>
                </Link>

                <Link to="/porters">
                    <div className="card mb-4 mt-4 text-center text-light bg-dark" style={{ width: "25rem", height: "15rem" }}>
                        <div className="card-body">
                            <h1 className="card-title"><i className="fa fa-users"></i></h1>
                            <h3 className="card-text select-text">Porters</h3>
                        </div>
                    </div>
                </Link>

            </div>

        </div>
    </>
}

export default ChiefHallAdminDashboard;