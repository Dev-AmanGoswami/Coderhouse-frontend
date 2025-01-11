import { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
export const useWebRTC = () => {
    const [clients, setClients] = useStateWithCallback([
        {
            id: 1,
            name: 'Rakesk K'
        },{
            id: 2,
            name: 'John Doe'
        }
    ]);
    return {clients};
}