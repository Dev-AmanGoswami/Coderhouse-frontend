import React, { useState } from "react";
import Card from "../../../components/global/Card/Card";
import Button from "../../../components/global/Button/Button";
import UploadLoader from "../../../components/global/UploadLoader/UploadLoader";
import { MdOutlineMonochromePhotos } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './StepAvatar.module.css';

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAvatar } from "../../../store/slices/activateSlice";

// APIs
import { activate } from "../../../http";
import { setAuth } from "../../../store/slices/authSlice";

// Cloud
import cloudLinks from "../../../cloud-links.json";

const StepAvatar = () => {
    const { name, avatar } = useSelector((state) => state.activate);
    const dispatch = useDispatch();

    const [image, setImage] = useState(cloudLinks.monkeyAvatar);
    const [avatarFile, setAvatarFile] = useState(null);

    const [uploadLoader, setUploadLoader] = useState(false);
    const captureImage = (e) => {
        const file = e.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setAvatarFile(file);
            dispatch(setAvatar(imageURL));
        }
    }

    const submit = async () => {
        if(!name || !avatar) return;
        const formData = new FormData();
        formData.append("name",name);
        formData.append("avatar",avatarFile);
        try{
            setUploadLoader(true);            
            const { data } = await activate(formData);
            if(data.auth){
                dispatch(setAuth(data));
            }
            setUploadLoader(false);
        }catch(err){
            console.log("Error activating user: ",err);
        }
    }

    return(
        uploadLoader ? <UploadLoader /> :
        <Card title={`Okay, ${name}`} icon={<MdOutlineMonochromePhotos color="grey" size={40} />}>
            <p className={styles.subHeading}>How's this photo?</p>
            <div className={styles.avatarWrapper}>
                <img className={styles.avatarImage} src={image} alt="avatar" />
            </div>
            <div>
                <input id="avatarInput" type="file" name="avatar" className={styles.avatarInput} onChange={captureImage}/>
                <label htmlFor="avatarInput" className={styles.avatarLabel}>
                    Choosing a different photo...
                </label>
            </div>
            <div>
                <Button text="Next" icon={<FaLongArrowAltRight size={20} />} onClick={ submit } />
            </div>
        </Card>
    )
}

export default StepAvatar;