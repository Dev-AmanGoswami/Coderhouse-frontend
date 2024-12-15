import React,{useState} from "react";
import Card from "../../../../components/global/card/Card";
import Button from '../../../../components/global/button/Button';
import TextInput from "../../../../components/global/TextInput/TextInput";
import { CiMobile3 } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from '../StepPhoneEmail.module.css';

const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');    
    return (
        <Card title="Enter your Phone number" icon={<CiMobile3 color="red" size={35} />}>
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={onNext} />} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to our Terms of Service and Privacy Policy Thanks! 
                </p>
            </div>
        </Card>

    )
}

export default Phone;