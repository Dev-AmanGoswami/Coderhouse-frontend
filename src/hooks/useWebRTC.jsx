import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([]);

    const audioElements = useRef({}); //Used to access audio player of specific user
    const connections = useRef({}); //Storing all peer connections
    const localMediaStream = useRef(null); //Storing self local media stream
    const socket = useRef(null);

    const provideRef = (audioPlayerInstance, userId) => {
        audioElements.current[userId] = audioPlayerInstance;
    }

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients]);

    useEffect(() => {
        socket.current = socketInit();
    },[]);

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

        // Implementing Leaving room logic
        return () => {
            localMediaStream.current.getTracks().forEach(track => track.stop());
            socket.current.emit(ACTIONS.LEAVE, { roomId });
        }
    }, []);

    useEffect(() => {
        const handleNewPeer = async ({peerId, createOffer, user: remoteUser }) => {
            // If already conencted then give warning
            if(peerId in connections.current){
                return console.warn(`You are connected with ${peerId} (${remoteUser.name})`);
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            })

            // Handle new ice candidate
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                })
            }

            // Handle on track on this connection
            connections.current[peerId].ontrack = ({
                streams: [remoteStream]
            }) => {
                addNewClient(remoteUser, () => {
                    if(audioElements.current[remoteUser.id]){
                        audioElements.current[remoteUser.id].srcObject = remoteStream
                    }else{
                        let settled = false;
                        const interval = setInterval(()=>{
                            if(audioElements.current[remoteUser.id]){
                                audioElements.current[remoteUser.id].srcObject = remoteStream;
                                settled = true;
                            }       

                            if(settled) clearInterval(interval);
                        },1000);
                    }
                });
            }

            // Add local track to remote connections
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(track, localMediaStream.current);
            })

            // Creating Offer
            if(createOffer){
                const offer = await connections.current[peerId].createOffer();

                await connections.current[peerId].setLocalDescription(offer);
                // Send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP,{
                    peerId,
                    sessionDescription: offer
                })
            }
        }

        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
        
        // Cleaning function when component gets unmounted
        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        }
    },[]);

    // Handle Ice candidate
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
            if(icecandidate){
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        })
        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        }
    },[]);

    // Handle SDP
    useEffect(() => {
        const handleRemoteSDP = async ({ peerId, sessionDescription: remoteSessionDescription }) => {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription()
            )
            if (remoteSessionDescription.type === 'offer'){
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                connection.setLocalDescription(answer);
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer
                })
            }
        }
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);
        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        }
    },[]);

    // Handle remove Peer
    useEffect(() => {
        const handleRemovePeer = async ({ peerId, userId }) => {
            if(connections.current[peerId]){
                connections.current[peerId].close();
            }
            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients(list => list.filter(client => client.id !== userId));
        }

        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        }

    },[]);

    return { clients, provideRef };
}