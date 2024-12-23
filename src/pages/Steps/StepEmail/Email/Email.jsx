import { useState } from "react";
import Card from "../../../../components/global/card/Card";
import Button from '../../../../components/global/button/Button';
import TextInput from "../../../../components/global/TextInput/TextInput";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from '../StepEmail.module.css';
import { sendOtp } from "../../../../http";

// Redux
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/slices/authSlice";

const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const submit = async () => {
        try {
            // Server request
            const { data } = await sendOtp({ email });
            dispatch(setOtp({
                email: data.email,
                hash: data.hash
            }))
            onNext();
        }catch(error){
            console.log("Error: ",error);
        }
    }

    return (
        <Card title="Enter your Email" icon={<MdOutlineMarkEmailUnread size={40} />}>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={submit} />} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your email, you're agreeing to our Terms of Service and Privacy Policy Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Email;