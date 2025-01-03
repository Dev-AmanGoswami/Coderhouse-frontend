import React, { useState } from "react";
import Card from "../../../components/global/card/Card";
import Button from "../../../components/global/button/Button";
import TextInput from "../../../components/global/TextInput/TextInput";
import { FaLock } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './StepOtp.module.css';
import { verifyOtp } from "../../../http";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/slices/authSlice";
import Loader from "../../../components/global/loader/Loader";

const StepOtp = ({ onNext }) => {
    const [otp, setOtp] = useState('');
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { email, hash } = useSelector((state) => state.auth.otp);

    const submit = async () => {
        try{
            setLoader(true);
            const { data } = await verifyOtp({ otp, email, hash });
            dispatch(setAuth({ user: data.user }));
            setLoader(false);
            onNext();
        }catch(error){
            console.log("Error: ",error);
        }
    }  

    return(
            loader ? <Loader /> : 
            <Card title="Enter the code we just texted you" icon={<FaLock size={40} />}>
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" icon={<FaLongArrowAltRight size={20} />} onClick={ submit } />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your email, you're agreeing to our Terms of Service and Privacy Policy Thanks! 
                </p>
            </Card>
    )
}

export default StepOtp;