import { Link } from "react-router-dom";
import styles from "./styles.module.css";
// import axios from "axios";

export default function Login() {


    const googleAuth = async (e) => {
        e.preventDefault()
        await window.open(`http://localhost:1235/api/auth/`, "_self");
        // try {
        //     const url = `http://localhost:1235/api/auth/succes`;
        //     const {data} = await axios.get(url, {withCredentials: true});
        //     modifyUser(data.user);
        //     console.log(data.user)
        //     // console.log("maioneza")
        //   } catch(err) {
        //     console.log(err)
        //   }
    }

    return (
        <div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
					<button className={styles.google_btn} onClick={(e)=>googleAuth(e)}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
			</div>
		</div>
    );
}