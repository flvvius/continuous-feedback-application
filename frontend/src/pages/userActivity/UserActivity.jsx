import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (new Date(activity.expirationDate).getTime() < new Date().getTime()) {
                navigate("/home")
            }
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [activity])
    

    const goBack = () => {
        navigate("/home")
    }

    const handleSmiley = async () => {
        const feedback = {
            date: new Date(),
            type: "smiley",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback)
        .then((res) => {
            console.log(res.status)
            toast.success("Feedback sent!", {
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
            toast.error("Sorry, but there was an error, please try again", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(er)
          });
    }

    const handleFrowny = async () => {
        const feedback = {
            date: new Date(),
            type: "frowny",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback)
        .then((res) => {
            console.log(res.status)
            toast.success("Feedback sent!", {
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
            toast.error("Sorry, but there was an error, please try again", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(er)
          });
    }

    const handleSurprised = async () => {
        const feedback = {
            date: new Date(),
            type: "surprised",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback)
        .then((res) => {
            console.log(res.status)
            toast.success("Feedback sent!", {
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
            toast.error("Sorry, but there was an error, please try again", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(er)
          });
    }

    const handleConfused = async () => {
        const feedback = {
            date: new Date(),
            type: "confused",
            activityId: activity.id
        }
        await axios.post("http://localhost:1235/api/feedback", feedback)
        .then((res) => {
            console.log(res.status)
            toast.success("Feedback sent!", {
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
            toast.error("Sorry, but there was an error, please try again", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(er)
          });
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


        </div>
    )
}

export default UserActivity;