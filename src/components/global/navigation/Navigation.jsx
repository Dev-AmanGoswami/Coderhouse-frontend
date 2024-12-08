import React from "react";
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";
import styles from './Navigation.module.css';

const Navigation = () => {
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
    
    return (
        <nav className={`${styles.navbar} container`}>
            <Link to="/" style={brandStyle}>
                <MdWavingHand color="yellow" size={40}/>
                <span style={logoText}>Codershouse</span>
            </Link>
        </nav>
    );
}

export default Navigation;