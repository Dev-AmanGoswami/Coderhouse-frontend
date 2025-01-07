import React, { useState } from "react";
import Card from "../../../components/global/Card/Card";
import Button from "../../../components/global/Button/Button";
import TextInput from "../../../components/global/TextInput/TextInput";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './StepName.module.css';

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setName } from "../../../store/slices/activateSlice";

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(name);

    const nextStep = () => {
        if(!fullname) return;
        dispatch(setName(fullname));
        onNext();
    }

    return(
        <Card title="What's your full name?" icon={<BsEmojiSunglassesFill color="yellow" size={40} />}>
            <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <p className={styles.paragraph}>
                People use real names at EchoRoom :) !
            </p>
            <div>
                <Button text="Next" icon={<FaLongArrowAltRight size={20} />} onClick={ nextStep } />
            </div>
        </Card>
    )
}

export default StepName;