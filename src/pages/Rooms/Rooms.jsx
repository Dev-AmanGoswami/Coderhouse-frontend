import React,{ useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import Button from "../../components/global/Button/Button";
import RoomCard from "../../components/roomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";

// APIs
import { getAllRooms } from "../../http";

// Styles
import styles from './Rooms.module.css';

const Rooms = () => {
    const [ showAddRoomModal, setShowAddRoomModal ] = useState(false);
    const [ rooms,  setRooms ] = useState([]);     
    const openAddRoomModal = () => {
        setShowAddRoomModal(true);
    }
    
    const closeAddRoomModal = () => {
        setShowAddRoomModal(false);
    }

    useEffect(()=>{
        const fetchAllRoomsfunc = async () => {
            const { data } = await getAllRooms();
            setRooms(data);
        }
        fetchAllRoomsfunc();
    },[]);
    return (
        <>
            <div className="container">
                <div className={ styles.roomsHeader }>
                    <div className={ styles.left }>
                        <span className={ styles.heading }>All voice rooms</span>
                        <div className={ styles.searchBox }>
                            <CiSearch size={25} />
                            <input type="text" className={ styles.searchInput } />
                        </div>
                    </div>
                    <div className={ styles.right }>
                        <Button text="+ Create room" onClick={ openAddRoomModal } icon={<FaUsersLine size={20} color="white"/>} />
                    </div>
                </div>
                <div className={ styles.roomList }>
                    {
                        rooms.map((room) =>
                            <>
                                <RoomCard key={ room.id } room={ room } />                            
                                <RoomCard key={ room.id } room={ room } />                            
                                <RoomCard key={ room.id } room={ room } />                            
                                <RoomCard key={ room.id } room={ room } />                            
                                <RoomCard key={ room.id } room={ room } />                            
                            </>
                        )
                    }
                </div>
            </div>
            {showAddRoomModal && <AddRoomModal onClose={ closeAddRoomModal }/>}
        </>
    );
}

export default Rooms;