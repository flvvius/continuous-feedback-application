import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const UserActivity = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const accessCode = location.state.accessCode;
    const [activity, setActivity] = useState({});

    const getActivity = async () => {
        const response = await axios.get(`http://localhost:1235/api/activity/code/${accessCode}`);
        await setActivity(response.data);
    }

    useEffect(() => {
        getActivity();
    }, []);

    const goBack = () => {
        navigate("/home")
    }

    const handleSmiley = async () => {
        const feedback = {
            date: new Date(),
            type: "smiley",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback);
    }

    const handleFrowny = async () => {
        const feedback = {
            date: new Date(),
            type: "frowny",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback);
    }

    const handleSurprised = async () => {
        const feedback = {
            date: new Date(),
            type: "surprised",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback);
    }

    const handleConfused = async () => {
        const feedback = {
            date: new Date(),
            type: "confused",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback);
    }

    return (
        <div className={styles.container}>
            <h1>Activity:</h1>
            <p>Description: {activity.description}</p>
            <p>Expiration date: {activity.expirationDate}</p>
            <h2>Your honest reaction:</h2>
            <div className={styles.interfata}>
                <div className={styles.cadran} onClick={handleSmiley}>😀</div>
                <div className={styles.cadran} onClick={handleFrowny}>🙁</div>
                <div className={styles.cadran} onClick={handleSurprised}>😱</div>
                <div className={styles.cadran} onClick={handleConfused}>🤨</div>
            </div>
            <button className={styles.btn} onClick={goBack}>Go back</button>
        </div>
    )
}

export default UserActivity;