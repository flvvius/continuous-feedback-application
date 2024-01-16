import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FeedbackElem from "../feedbackElem/FeedbackElem";

const Feedback = () => {

    const [activity, setActivity] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id;

    const getActivity = async () => {
        const response = await axios.get(`http://localhost:1235/api/activity/${id}`);
        await setActivity(response.data);
    }

    useEffect(() => {
        getActivity();
        const interval = setInterval(() => {
            getActivity();
        }, 3000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    

    const feedback = activity.Feedback;
    console.log(activity.Feedback)

    const goBack = () => {
        navigate("/activities");
    }

    return (
        <>
            <h1>Feedback:</h1>
            {
                feedback?.length > 0 ? (
                    
                <div className={styles.container}>
                    {feedback.map(feedbackVal => (
                    <FeedbackElem feedback={feedbackVal} />
                    ))}
                </div>
                ) : (<div className={styles.empty}>
                    <h2>No feedback found</h2>
                </div>)
            }
            <button onClick={goBack} className={styles.btn}>Go back</button>
        </>
    )
}

export default Feedback;