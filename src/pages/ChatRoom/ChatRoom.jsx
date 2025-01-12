import { useParams } from "react-router-dom";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
const ChatRoom = () => {
    const {id: roomId} = useParams();
    const user = useSelector(state => state.auth.user);
    const { clients, provideRef } = useWebRTC(roomId,user); //Passing Room id and user details
    return(
        <div>
            <h1>All connected clients</h1>
            {
                clients.map(client => {
                    return <div key={client.id}>
                        {/* Ref also provides every element instance */}
                        <audio ref={(audioPlayerInstance) => provideRef(audioPlayerInstance, client.id)} controls autoPlay></audio> 
                        <h4>{client.name}</h4>
                    </div>
                })
            }
        </div>
    )
};

export default ChatRoom;