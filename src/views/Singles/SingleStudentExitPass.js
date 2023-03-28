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

        {exitPass && <>
            <button className="btn btn-danger" onClick={goBack}>Go Back</button>

            <section className="container bg-dark text-light p-4 mt-3" style={{ borderRadius: "10px", width: '45rem', height: 'fit-content' }}>

                <h4>Student Name : {exitPass.studentName}</h4>
                <h4>Matric No: {exitPass.studentMatricNo}</h4>
                <h4>Hall : {exitPass.hallName} Hall</h4>
                <hr />
                <p className="fs-5">Exit Date: {exitPass.dateOfExit?.substring(0, 10)}</p>
                <p className="fs-5">Return Date : {exitPass.dateOfReturn?.substring(0, 10)}</p>
                <p className="fs-5">Reason for leaving : {exitPass.reasonForLeaving}</p>
                <p className="fs-5">State of arrival : {exitPass.stateOfArrival}</p>
                <p className="fs-5">Address : {exitPass.address}</p>
                <hr />
                <p className="fs-5"> Approved : {exitPass.isApproved === true && <span>Yes</span>} {exitPass.isApproved === false && <span>No</span>}</p>
                <p className="fs-5"> Has Returned : {exitPass.hasReturned === true && <span>Yes</span>} {exitPass.hasReturned === false && <span>No</span>}</p>
                <hr />
            </section>

        </>}
    </>
}

export default SingleStudentExitPass;