import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextInput from '../global/TextInput/TextInput';
import Button from '../global/Button/Button';
import { ImCross } from "react-icons/im";
import { IoIosAddCircle } from "react-icons/io";
import styles from './AddRoomModal.module.css';

// APIs
import { createRoom as create } from '../../http';

// Cloud
import cloudLinks from "../../cloud-links.json";

const AddRoomModal = ({ onClose }) => {
    const history = useHistory();
    const [ roomType, setRoomType ] = useState('open');
    const [ topic, setTopic ] = useState('');   
    const createRoom = async () => {
        try{
            if(!topic) return;
            const { data } = await create({ topic, roomType });
            history.push(`/room/${data.id}`);
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <div className={ styles.modalMask }>
            <div className={ styles.modalBody }>
                <button onClick={ onClose } className={styles.closeButton}>
                    <ImCross size={15} color="white"/>
                </button>
                <div className={ styles.modalHeader }>
                    <h3 className={ styles.heading }>Enter the topic to be discussed</h3>
                    <TextInput fullWidth="true" value={topic} onChange={(e) => setTopic(e.target.value)}/>
                    <h2 className={ styles.subHeading }>Room types</h2>
                    <div className={ styles.roomTypes }>
                        <div onClick={() => setRoomType('open')} className={`${styles.roomTypeBox} ${roomType === 'open' ? styles.active : ''}`}>
                            <img src={cloudLinks.globeImage} width={100} height={100} />
                            <span>Open</span>
                        </div>
                        <div onClick={() => setRoomType('social')} className={`${styles.roomTypeBox} ${roomType === 'social' ? styles.active : ''}`}>
                            <img src={cloudLinks.socialGroup} width={100} height={100} />
                            <span>Social</span>
                        </div>
                        <div onClick={() => setRoomType('private')} className={`${styles.roomTypeBox} ${roomType === 'private' ? styles.active : ''}`}>
                            <img src={cloudLinks.lock} width={60} height={60} />
                            <span>Private</span>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h2>Create a room, open to everyone</h2>
                    <Button text="Let's Go" icon={ <IoIosAddCircle size={20}/> } onClick={createRoom}/>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal;