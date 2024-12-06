import styles from './Home.module.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return <div className={styles.card}>
        <div className={styles.headingWrapper}>
            <img src="images/" alt=""></img>
            <h1>Welcome to Codershouse!</h1>
            <p>We're working hard to get Codershouse ready for everyone. While we wrap up the finising youches, we're adding people gradually.</p>
            <div>
                <button>
                    <span>Get your username</span>
                    <img src="/images" alt="arrow" />
                </button>
            </div>
            <div>
                <span>Have an invite text?</span>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    </div>
}
export default Home;