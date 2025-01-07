import { ImUsers } from "react-icons/im";
import { BsFillChatLeftTextFill } from "react-icons/bs";

import styles from './RoomCard.module.css';
const RoomCard = ({ room }) => {
    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.topic}>{room.topic}</h3>
                <div className={styles.speakers}>
                    <div className={styles.avatars}>
                        {room.speakers.map(speaker => (
                            <img key={speaker.id} src={speaker.avatar} alt="speaker-avatar" />
                        ))}
                    </div>
                    <div className={styles.names}>
                        {room.speakers.map(speaker => (
                            <div key={speaker.id} className={styles.nameWrapper}>
                                <span>{speaker.name}</span>
                                <BsFillChatLeftTextFill size={20}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.peopleCount}>
                    <span>{room.totalPeople}</span> 
                    <ImUsers size={16}/>
                </div>
            </div>
        </>
    )
}

export default RoomCard;