import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Activity from "../activity/Activity";

const Activities = () => {

    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();


    const getActivities = async () => {
        const data = await axios.get("http://localhost:1235/api/activity");
        setActivities(data.data);
    }

    useEffect(() => {
        getActivities();
    }, []);

    const goBack = () => {
        navigate("/home")
    }

    console.log(activities)

    return (
        <>
            <h1>Select activity:</h1>
            {
                activities?.length > 0 ? (
                    
                <div className={styles.container}>
                    {activities.map(activitiy => (
                    <Activity act={activitiy} />
                    ))}
                </div>
                ) : (<div className={styles.empty}>
                    <h2>No activities found</h2>
                </div>)
            }
            <button onClick={goBack} className={styles.btn}>Go back</button>
        </>
    )
}

export default Activities;