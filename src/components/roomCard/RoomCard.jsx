import { useNavigate } from 'react-router-dom';
import { ImUsers } from "react-icons/im";
import { BsFillChatLeftTextFill } from "react-icons/bs";

import styles from './RoomCard.module.css';
const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.card} onClick={() => navigate(`/room/${room.id}`)}>
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
                                <BsFillChatLeftTextFill size={12}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.peopleCount}>
                    <span>{room.speakers.length}</span> 
                    <ImUsers size={16}/>
                </div>
            </div>
        </>
    )
}

export default RoomCard;