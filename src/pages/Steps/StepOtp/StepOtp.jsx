import React, { useState } from "react";
import Card from "../../../components/global/card/Card";
import Button from "../../../components/global/button/Button";
import TextInput from "../../../components/global/TextInput/TextInput";
import { FaLock } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './StepOtp.module.css';

const StepOtp = ({ onNext }) => {
    const [otp, setOtp] = useState('');

    return(
        <div className={styles.cardWrapper}> 
            <Card title="Enter the code we just texted you" icon={<FaLock size={40} />}>
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={ onNext } />} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your email, you're agreeing to our Terms of Service and Privacy Policy Thanks! 
                </p>
            </Card>
        </div>
    )
}

export default StepOtp;