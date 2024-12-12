import React, { useState } from "react";
import Phone from './Phone/Phone';
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";
import { FaMobileScreen } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md"

const phoneEmailMap = {
    phone: Phone,
    email: Email
}

const StepPhoneEmail = ({ onNext }) => {
    const [type, setType] = useState('phone');
    const Component = phoneEmailMap[type];
    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrap} >
                        <button className={`${styles.tabButton} ${
                            type === 'phone' ? styles.active : ''                   
                        }`} onClick={() => setType('phone')}>< FaMobileScreen color="white" size={30}/></button>
                        <button className={`${styles.tabButton} ${
                            type === 'email' ? styles.active : ''                   
                        }`} onClick={() => setType('email')}><MdOutlineMarkEmailUnread color="white" size={35}/></button>
                    </div>
                    <Component onNext={onNext} />
                </div>
            </div>
        </>
    )
}

export default StepPhoneEmail;