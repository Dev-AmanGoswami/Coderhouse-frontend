import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import axios from 'axios';

export const useLoadingWithRefresh = () => {
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Immediately invoked function
        (async () => {
            try{
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
                    withCredentials: true
                });
                dispatch(setAuth(data));  
                setLoader(false);          
            }catch(error){
                console.log(error);
                setLoader(false);
            }
        })();
    },[]);

    return { loader };
}