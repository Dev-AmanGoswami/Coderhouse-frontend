import React,{useState} from "react";
import { CiSearch } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import Button from "../../components/global/button/Button";
import styles from './Rooms.module.css';
import RoomCard from "../../components/global/roomCard/RoomCard";

const rooms = [{
    id: 1,
    topic: 'Which framework best for frontend ?',
    speakers: [{
        id: 1,
        name: 'John Doe',
        avatar: 'https://clipart-library.com/new_gallery/70-709202_download-animals-monkey-png-transparent-images-transparent-bad.png'
    }]
}]

const Rooms = () => {
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <CiSearch size={25} />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <Button text="Start a room" icon={<FaUsersLine size={20} color="white"/>} />
                    </div>
                </div>
                <div className={styles.roomList}>
                    {
                        rooms.map((room)=> <RoomCard key={ room.id } room={ room } />)
                    }
                </div>
            </div>
        </>
    );
}

export default Rooms;