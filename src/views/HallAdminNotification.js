import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const HallAdminNotifications = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const user = JSON.parse(localStorage.getItem('user'));
    const hallId = user.hallId;

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function getNotifications() {
            
            try {
                const { data } = await axios.get(`https://localhost:44324/api/Notification/get-notifications-in-hall/${hallId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });
                setNotifications(data);

            }

            catch (error) {
                if (error.response.status === 401) {
                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");
                    navigate("/hallAdmin-login");
                }
                else {
                    console.error(error.response.data);
                }
            }

        }

        getNotifications();
    }, [setNotifications])

    return <>
        <div className="container ms-auto me-auto mt-3">

            <div style={{ borderRadius: "10px" }} className="d-flex justify-content-between bg-dark p-4 text-light">
                <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                <h3>Notifications [ {notifications.length} ]</h3>
                <Link to="/add-notification"><button className="btn btn-success">Post</button></Link>
            </div>

            <div className="row mt-2">

                {notifications.length > 0 ? (
                    notifications.map(notification => {

                        return <>
                            <div className="container">
                                <section style={{ borderRadius: "10px" }} className="bg-dark text-light p-4 mt-4 fs-5">
                                    <h5>{notification.dateCreated?.substring(0, 10)} at {notification.dateCreated?.substring(11, 16)}</h5>
                                    <hr />
                                    <p>{notification.notificationContent}</p>
                                </section>
                            </div>

                        </>
                    })

                ) : (
                    <div className="text-center mt-3">
                        <h2>No Notifications</h2>
                    </div>
                )}


            </div>
        </div>
    </>
}

export default HallAdminNotifications;