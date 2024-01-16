import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Activity = (props) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log(id)
        navigate(`/feedback`, {state: {
            id: id
        }})
    }

    const date1 = (new Date(props.act.date)).toLocaleString('en-US', {
        timeZone: 'Europe/Bucharest',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });;
    const date2 = (new Date(props.act.expirationDate)).toLocaleString('en-US', {
        timeZone: 'Europe/Bucharest',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });;

    return (
        <div className={styles.activity}>
            <button onClick={() => handleClick(props.act.id)} >
                <p>Description: {props.act.description}</p>
                <p>Start date: {date1}</p>
                <p>Expiration date: {date2}</p>
                <p>Access code: {props.act.accessCode}</p>
            </button>
        </div>
    )
}

export default Activity;