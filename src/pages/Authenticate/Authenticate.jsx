import React,{useState} from "react";
import StepEmail from "../Steps/StepEmail/StepEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";


const steps = {
    1: StepEmail,
    2: StepOtp
}

const Authenticate = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
    const onNext = () => {
        setStep(step + 1);
    }
    return (
        <div><Step onNext={ onNext }/></div>
    );
}

export default Authenticate;