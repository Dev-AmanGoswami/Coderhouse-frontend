import styles from './Home.module.css';
import Card from '../../components/global/card/Card';
import Button from '../../components/global/button/Button';
import { MdWavingHand } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px'
    }

    const startRegister = () => {
        navigate('/authenticate');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Codershouse!" icon={<MdWavingHand color="yellow" size={40} />}>
                <p className={styles.text}>
                    We're working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we're adding people to make sure nothing breaks.
                </p>
                <div>
                    <Button text="Let's Go" icon={<FaLongArrowAltRight size={20}/>} onClick={startRegister}/>
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>Have an invite text?</span>
                </div>
            </Card>
        </div>
    )
}
export default Home;