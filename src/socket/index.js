import {io} from 'socket.io-client';

// Initializing socket and connecting to backend
export const socketInit = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    };
    return io(process.env.REACT_APP_API_URL,options);
}
