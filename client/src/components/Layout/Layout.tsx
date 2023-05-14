import {FC, PropsWithChildren} from "react";
import styles from './Layout.module.scss'
import logo from '../../assets/logo.svg'
import el_right from '../../assets/ellipse_right.png'
import el_left from '../../assets/ellipse_left.png'

const Layout: FC<PropsWithChildren<any>> = ({children}) => {
    return (
        <div className={styles.layout}>
            <img src={el_left} alt="" className={styles.left}/>
            <div>
                <img src={logo} alt="logo icon"/>
            </div>
            {children}
            <img src={el_right} alt="" className={styles.right}/>
        </div>
    );
};

export default Layout;
