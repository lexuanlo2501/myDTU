import classNames from "classnames/bind";
import Header from "../components/Header/index.js";
import styles from "./DefaultLayout.module.scss"

import SideBar from "./SideBar";

const cx = classNames.bind(styles)

function DefaultLayout({children, setUser}) {
    return (
        <div className={cx('wrapper')}>
            <Header setUser={setUser}/>
            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;