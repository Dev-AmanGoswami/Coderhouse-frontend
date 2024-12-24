import React, { useState } from "react";
import Card from "../../../components/global/card/Card";
import Button from "../../../components/global/button/Button";
import { MdOutlineMonochromePhotos } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './StepAvatar.module.css';

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAvatar } from "../../../store/slices/activateSlice";

// APIs
import { activate } from "../../../http";

const StepAvatar = () => {
    const { name, avatar } = useSelector((state) => state.activate);

    const dispatch = useDispatch();
    const [image, setImage] = useState('https://clipart-library.com/new_gallery/70-709202_download-animals-monkey-png-transparent-images-transparent-bad.png');
    const captureImage = (e) => {
        const file = e.target.files[0];
        // Converting file into base 64 stream and put them in src
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }
    }

    const submit = async () => {
        try{
            const { data } = await activate({ name, avatar});
            console.log(data);
        }catch(err){
            console.log("Error activating user: ",err);
        }
    }

    return(
        <Card title={`Okay, ${name}`} icon={<MdOutlineMonochromePhotos color="grey" size={40} />}>
            <p className={styles.subHeading}>How's this photo?</p>
            <div className={styles.avatarWrapper}>
                <img className={styles.avatarImage} src={image} alt="avatar" />
            </div>
            <div>
                <input id="avatarInput" type="file" className={styles.avatarInput} onChange={captureImage}/>
                <label htmlFor="avatarInput" className={styles.avatarLabel}>
                    Choosing a different photo...
                </label>
            </div>
            <div>
                <Button text="Next" icon={<FaLongArrowAltRight size={20} onClick={ submit } />} />
            </div>
        </Card>
    )
}

export default StepAvatar;