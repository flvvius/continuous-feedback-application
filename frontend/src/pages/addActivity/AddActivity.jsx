import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log(formattedStartDateTime, formattedEndDateTime);

    const handleClick = () => {
        const activity = {
            date: formattedStartDateTime,
            description: description,
            accessCode: accessCode,
            expirationDate: formattedEndDateTime
        }

        const response = axios.post("http://localhost:1235/api/activity", activity);
        console.log(response);
    }

    const goBack = () => {
        navigate("/home");
    }

    return (
        <>
            <form> 
                <label htmlFor="date">Activity start date:</label>
                <input type="datetime-local" name="date" id="date" onChange={(e) => setStartDate(e.target.value)} />

                <label htmlFor="description">Description of the activity:</label>
                <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="accessCode">Access code:</label>
                <input type="number" name="accessCode" id="accessCode" onChange={(e) => setAccessCode(e.target.value)} />

                <label htmlFor="endDate">Activity expiration date:</label>
                <input type="datetime-local" name="endDate" id="endDate" onChange={(e) => setEndDate(e.target.value)} />

                <button onClick={handleClick}>Add activity</button>
            </form>

            <button onClick={goBack}>Go back</button>
        </>
    )
}

export default AddActivity;