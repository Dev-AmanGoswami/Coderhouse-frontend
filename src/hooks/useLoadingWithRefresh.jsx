import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import axios from 'axios';

export const useLoadingWithRefresh = () => {
    const [loader, setLoader] = useState(true);
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                // Call API if cookie is present
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                    withCredentials: true
                });
                dispatch(setAuth(data));
            } catch (error) {
                console.error("Error refreshing authentication:", error);
            } finally {
                setLoader(false);
            }
        })();
    }, [dispatch]);

    return { loader };
}