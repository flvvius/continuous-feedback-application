import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Signup() {
	const googleAuth = () => {
		window.open(
			`http://localhost:1235/api/auth/`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				
			</div>
		</div>
	);
}