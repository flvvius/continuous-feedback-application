import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function HomeUser(userDetails) {
	const user = userDetails.user;
	const logout = async () => {
		await window.open("http://localhost:1235/api/auth/logout", "_self");
	};

	const navigate = useNavigate();

	const [value, setValue] = useState(0);
	const [activity, setActivity] = useState({});

	const getActivity = async () => {
		const response = await axios.get(`http://localhost:1235/api/activity/code/${value}`);
		await setActivity(response.data);
	}
	
	useEffect(() => {
		getActivity()
	}, [value]);

	const handleClick = () => {

		const date = new Date(activity.expirationDate);

		if (date.getTime() < (new Date()).getTime()) {
			alert("The activity has expired!");
		} else {
			navigate("/activity", {state: {
				accessCode: value
			}})
			
		}		
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
				<input
						type="text"
						defaultValue={user.name}
						className={styles.input}
						placeholder="UserName"
                        readOnly
					/>
					<input
						type="text"
						defaultValue={user.email}
						className={styles.input}
						placeholder="Email"
                        readOnly
					/>
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
				</div>
				<div className={styles.right}>
					<div className={styles.participaActivitate}>
						<p className={styles.participaParagraph}>Introduceti cod activitate:</p>
						<input type="number" placeholder="12345" className={styles.input} onChange={(e) => setValue(e.target.value)} />
						<button className={styles.btn} onClick={handleClick}>Participa la activitate!</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeUser;