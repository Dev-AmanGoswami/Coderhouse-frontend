import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([]);

    const audioElements = useRef({}); //Used to access audio player of specific user
    const connections = useRef({}); //Storing all peer connections
    const localMediaStream = useRef(null); //Storing self local media stream
    const socket = useRef(null);

    useEffect(() => {
        socket.current = socketInit();
    },[]);

    const provideRef = (audioPlayerInstance, userId) => {
        audioElements.current[userId] = audioPlayerInstance;
    }

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients]);

    // Capture Media
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
        }
        startCapture().then(() => {
            addNewClient(user, () => {
                const localElement = audioElements.current[user.id];
                if(localElement){
                    localElement.volume = 0; //If not set what we will be listening what we spoke
                    localElement.srcObject = localMediaStream.current; //Assigning our voice stream in its source object
                }

                // Sending Offer to the server using web socket
                socket.current.emit(ACTIONS.JOIN,{ roomId, user });
            })
        })
    }, []);

    return { clients, provideRef };
}