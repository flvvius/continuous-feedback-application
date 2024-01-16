import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom"

const HomeAdmin = (userDetails) => {
    const user = userDetails.user;
    const navigate = useNavigate();

    const addActivity = () => {
        console.log("clicked");
        navigate("/addActivity");
    }

    const viewFeedback = () => {
        navigate("/activities")
    }

    const logout = async () => {
		await window.open("http://localhost:1235/api/auth/logout", "_self");
	};

    return (
        <div className={styles.container}>
			<h1 className={styles.heading}>Home - Prof. {user.name}</h1>
            <div className={styles.form_container}>
                <button className={styles.btn} onClick={addActivity}>Create activity</button>
                <button className={styles.btn} onClick={viewFeedback}>View feedback</button>
                <button className={styles.btn} onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default HomeAdmin;