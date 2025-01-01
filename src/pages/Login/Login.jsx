import React, { useState } from "react";
import styles from './Login.module.css';
import StepEmail from "../Steps/StepEmail/StepEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
    1: StepEmail,
    2: StepOtp,
}

const Login = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
    const onNext = () => {
        setStep(step + 1);
    }
    return (
        <div><Step onNext={onNext}/></div>
    );
}

export default Login;
