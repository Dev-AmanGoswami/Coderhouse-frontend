import { useState } from "react";
import Card from "../../../../components/global/card/Card";
import Button from '../../../../components/global/button/Button';
import Loader from "../../../../components/global/loader/Loader";
import TextInput from "../../../../components/global/TextInput/TextInput";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './Email.module.css';
import { sendOtp } from "../../../../http";

// Redux
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/slices/authSlice";

const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    
    const submit = async () => {
        try {
            // Server request
            setLoader(true);
            const { data } = await sendOtp({ email });
            dispatch(setOtp({
                email: data.email,
                hash: data.hash
            }))
            setLoader(false);
            onNext();
        }catch(error){
            console.log("Error: ",error);
        }
    }

    return (
        loader ? <Loader /> : 
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