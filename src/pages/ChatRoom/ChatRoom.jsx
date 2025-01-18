import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { HiHandRaised } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { IoMicSharp } from "react-icons/io5";
import { IoMicOffSharp } from "react-icons/io5";

import styles from './ChatRoom.module.css';

// APIs
import { getRoom } from "../../http";

// Cloud
import cloudLinks from "../../cloud-links.json";

const ChatRoom = () => {
    const { id: roomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState();
    const user = useSelector(state => state.auth.user);
    // const { clients, provideRef } = useWebRTC(roomId,user); //Passing Room id and user details
    const clients = [{
        id: 1,
        name: 'Aman Goswami',
        avatar: cloudLinks.monkeyAvatar
    }];

    const handleManualLeave = () => {
        navigate('/rooms');
    }

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom(prev => data);
        }
        fetchRoom();
    },[roomId]);

    return (
        <div>
            <div className="container">
                <button className={styles.goBack} onClick={handleManualLeave}>
                    <FaLongArrowAltLeft size={20} color="#fff" />
                    <span>All voice rooms</span>
                </button>
            </div>

            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    <h2 className={styles.topic}>{room?.topic}</h2>
                    <div className={styles.actions}>
                        <button className={styles.raiseHandBtn}><HiHandRaised size={20} color="#ffd800" /></button>
                        <button onClick={handleManualLeave} className={styles.endCallBtn}><MdCallEnd size={20} color="#fff" /><span>Leave quietly</span></button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {
                        clients.map(client => {
                            return (
                                <div className={styles.client} key={client.id}>
                                    <div className={styles.userHead}>
                                        {/* Ref also provides every element instance */}
                                        {/* <audio ref={(audioPlayerInstance) => provideRef(audioPlayerInstance, client.id)} controls autoPlay></audio>  */}
                                        <img className={styles.userAvatar} src={cloudLinks.monkeyAvatar} alt="" />
                                        <button className={styles.micBtn}>
                                            <IoMicOffSharp size={22} color="#fff" />
                                        </button>
                                    </div>
                                    <h4>{client.name}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
};

export default ChatRoom;