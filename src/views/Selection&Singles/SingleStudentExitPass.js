import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const SingleStudentExitPass = () => {
    let params = useParams();
    const exitPassId = params.id;

    const [exitPass, setExitPass] = useState({});
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getExitPass(exitPassId) {
        try {
            const response = await axios.get(`https://localhost:44324/api/ExitPass/get-single-exitPass/${exitPassId}`)

            setExitPass(response.data);
        }
        catch (error) {
            window.alert(error.response.data);
            console.error(error.response.data);
        }
    }

    useEffect(() => {
        getExitPass(exitPassId);
    }, [exitPassId])

    return <>
        <button className="btn btn-danger w-25" onClick={goBack}>Go Back</button>

        {exitPass && <>

            <section className="bg-dark text-light p-4 mt-5">
                
                <h4>Student Name : {exitPass.studentName}</h4>
                <h4>Matric No: {exitPass.studentMatricNo}</h4>
                <h4>Hall : {exitPass.hallName} Hall</h4>
                <h6>Exit Date: {exitPass.dateOfExit?.substring(0, 10)}</h6>
                <h6>Return Date : {exitPass.dateOfReturn?.substring(0, 10)}</h6>
                <h6>Reason for leaving {exitPass.reasonForLeaving}</h6>
                <h6>State of arrival {exitPass.stateOfArrival}</h6>
                <h6>Address {exitPass.address}</h6>
                <hr />
                <h6> Approved : {exitPass.isApproved === true && <span>Yes</span>} {exitPass.isApproved === false && <span>No</span>}</h6>
                <h6> Has Returned: {exitPass.hasReturned === true && <span>Yes</span>} {exitPass.hasReturned === false && <span>No</span>}</h6>
                <hr />
                <Link to={`/view-student/${exitPass.studentId}`}><button className="btn btn-success">View Student details</button></Link>
            </section>

        </>}
    </>
}

export default SingleStudentExitPass;