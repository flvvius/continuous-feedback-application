import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


function HomeUser(userDetails) {
	const user = userDetails.user;
	const logout = async () => {
		await window.open("http://localhost:1235/api/auth/logout", "_self");
	};

	const navigate = useNavigate();

	const [value, setValue] = useState(-1214587);
	const [activity, setActivity] = useState({});

	const getActivity = async () => {
		const response = await axios.get(`http://localhost:1235/api/activity/code/${value}`)
		setActivity(response.data);
	}
	
	useEffect(() => {
		const fetchData = async () => {
			await getActivity();
		 };
	  
		 fetchData();
	}, [value]);

	const handleClick = () => {

		let date;
		try {
			date = new Date(activity.expirationDate);
			if (date.getTime() < (new Date()).getTime()) {
				toast.error("The activity has expired!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				  });
			} else {
				navigate("/activity", {state: {
					accessCode: value
				}})
			}	
		} catch(err) {
			toast.error("Invalid access code!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
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
	);
}

export default HomeUser;