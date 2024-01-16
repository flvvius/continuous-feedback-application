import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const AddActivity = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [accessCode, setAccessCode] = useState(0);

    const navigate = useNavigate();


    const timeZone = 'Europe/Bucharest';
            
    const formattedStartDateTime = startDate.toLocaleString('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedEndDateTime = endDate.toLocaleString('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    // console.log(startDate)
    // console.log(formattedStartDateTime, formattedEndDateTime);

    const handleClick = async () => {

        const activity = {
            date: formattedStartDateTime,
            description: description,
            accessCode: accessCode,
            expirationDate: formattedEndDateTime
        }
        
        axios.post("http://localhost:1235/api/activity", activity)
        .then((res) => {
            console.log(res.status)
            toast.success("Activity added!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((er) => {
            toast.error(er.response.data, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(er.response.data)
          });
        // .then((res) => alert(res)).catch((err) => alert(err));

    }

    const goBack = () => {
        navigate("/home");
    }

    return (
        <>
            <form className={styles.form_container}>
                <div className={styles.div}>
                    <label htmlFor="date">Activity start date:</label>
                    <input type="datetime-local" name="date" id="date" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className={styles.div}>
                    <label htmlFor="description">Description of the activity:</label>
                    <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.div}>
                    <label htmlFor="accessCode">Access code:</label>
                    <input type="number" name="accessCode" id="accessCode" onChange={(e) => setAccessCode(e.target.value)} />
                </div>
                <div className={styles.div}>
                    <label htmlFor="endDate">Activity expiration date:</label>
                    <input type="datetime-local" name="endDate" id="endDate" onChange={(e) => setEndDate(e.target.value)} />
                </div>

            </form>
            <button onClick={handleClick} className={styles.btn}>Add activity</button>

            <button onClick={goBack} className={styles.btn}>Go back</button>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default AddActivity;