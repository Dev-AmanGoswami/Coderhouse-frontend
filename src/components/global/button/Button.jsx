import React from "react";
import styles from './Button.module.css';

const Button = ({text, icon, onClick}) => {    
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{text}</span>
            {icon && <span className={styles.icon}>{icon}</span>}
        </button>
    );
}

export default Button;