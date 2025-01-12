import { useParams } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
import styles from './ChatRoom.module.css';

// Cloud
import cloudLinks from "../../cloud-links.json";

const ChatRoom = () => {
    const {id: roomId} = useParams();
    const user = useSelector(state => state.auth.user);
    const { clients, provideRef } = useWebRTC(roomId,user); //Passing Room id and user details
    return(
        <div>
            <h1>All connected clients</h1>
            {
                clients.map(client => {
                    return <div key={client.id} className={styles.userHead}>
                        {/* Ref also provides every element instance */}
                        <audio ref={(audioPlayerInstance) => provideRef(audioPlayerInstance, client.id)} controls autoPlay></audio> 
                        <img className={styles.userAvatar} src={cloudLinks.monkeyAvatar} alt="" />
                        <h4>{client.name}</h4>
                    </div>
                })
            }
        </div>
    )
};

export default ChatRoom;