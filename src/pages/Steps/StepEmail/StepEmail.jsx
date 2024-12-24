import React, { useState } from "react";
import Email from "./Email/Email";
import styles from './StepEmail.module.css';

const StepEmail = ({ onNext }) => {
    const Component = Email;
    return (
        <>
                <div>
                    <Component onNext={onNext} />
                </div>
        </>
    )
}

export default StepEmail;