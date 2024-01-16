import styles from "./styles.module.css";

const FeedbackElem = (props) => {
    return (
        <div className={styles.container}> 
            <p>Date: {props.feedback.date}</p>
            <p>Type: {props.feedback.type}</p>
        </div>
    )
}

export default FeedbackElem;