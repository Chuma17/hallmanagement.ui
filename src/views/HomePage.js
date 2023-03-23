import { Link } from "react-router-dom";

const HomePage = () => {
    return <>

        <section className="vh-110 background-radial-gradient">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form" className="img-fluid h-100" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-3x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">Hall Management System</span>

                                            </div>
                                            <p className="fs-6">Unlock hassle-free hostel living and elevate your university experience with our cutting-edge Hostel Management System.</p>

                                            <div className="">
                                                <p className="mb-4 pb-lg-2">Don't have an account? <Link to="/student-registeration"
                                                    style={{ color: '#393f81' }} > Register here</Link></p>
                                                <a href="/about" className="small text-muted">Terms of use</a><br />
                                                <a href="/privacy" className="small text-muted">Privacy policy</a>
                                            </div>

                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default HomePage;