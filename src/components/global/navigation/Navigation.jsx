import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import styles from './Navigation.module.css';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/slices/authSlice";

// APIs
import { logout } from "../../../http";

const Navigation = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    const brandStyle = {
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    };

    const logoText = {
        margin: '10px'
    }
    
    const logoutUser = async () => {
        try{
            const {data} = await logout();
            dispatch(setAuth(data));    
        }catch(error){
            console.log(error);
        }
    }
    

    return (
        <nav className={`${styles.navbar} container`}>
            <Link to="/" style={brandStyle}>
                <MdWavingHand color="yellow" size={40}/>
                <span style={logoText}>Codershouse</span>
            </Link>
            <div className={styles.navRight}>
                <h3>{user.name}</h3>
                <Link to="/">
                    <img className={styles.avatar} src='https://clipart-library.com/new_gallery/70-709202_download-animals-monkey-png-transparent-images-transparent-bad.png' width="40" height="40" alt="avatar" />
                </Link>
            { isAuth && <button onClick={logoutUser}><RiLogoutCircleRFill size={30} color="0077FF" /></button> }
            </div>
        </nav>
    );
}

export default Navigation;