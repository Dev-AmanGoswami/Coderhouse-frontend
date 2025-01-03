import styles from './RoomCard.module.css';
const RoomCard = ({ room }) => {
    return(
        <>
            <div className={ styles.card }>
                <h3 className={ styles.topic }>{ room.topic }</h3>
                <div className={styles.speakers}>
                    <div className={styles.avatars}>
                
                    </div>
                    <div className={styles.names}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomCard;