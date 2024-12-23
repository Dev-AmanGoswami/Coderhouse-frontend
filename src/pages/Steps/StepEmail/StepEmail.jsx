import React, { useState } from "react";
import Email from "./Email/Email";
import styles from './StepEmail.module.css';

const StepEmail = ({ onNext }) => {
    const Component = Email;
    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <Component onNext={onNext} />
                </div>
            </div>
        </>
    )
}

export default StepEmail;