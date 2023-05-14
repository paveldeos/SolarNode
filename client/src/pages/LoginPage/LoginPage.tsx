import {useEthereum} from "../../hooks/useEthereum.ts";
import Layout from "../../components/Layout/Layout.tsx";
import {FC, FormEvent, useState} from "react";
import styles from './LoginPage.module.scss'
import metamask from '../../assets/metamask.svg'
import {useNavigate} from "react-router-dom";

interface LoginProps {
    onConnect: () => void;
}


const Login: FC<LoginProps> = ({onConnect}) => {
    const {connect} = useEthereum();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleConnect = async () => {
        try {
            await connect();
            onConnect();
            navigate('/blockchains');
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();

        console.log(username, password);
    };

    return (
        <Layout>
            <div className={styles.formContainer}>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputСontainer}>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="username">Login</label>
                    </div>

                    <div className={styles.inputСontainer}>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>


                    <div className={styles.btns}>
                        <button type="submit" className={styles.login}>Login</button>
                        <button type="button" onClick={handleConnect} className={styles.metamask}>
                            <img src={metamask} alt="metamask icon"/>Connect Wallet
                        </button>
                    </div>

                </form>
            </div>

        </Layout>
    );
};

export default Login;
