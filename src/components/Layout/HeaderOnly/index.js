import classNames from "classnames/bind";
import Header from "../components/Header/index.js";
import styles from './HeaderOnly.module.scss'

const cx = classNames.bind(styles)

function HeaderOnly({children, setReset,avt_src}) {
    return (
        <div className={cx('wrapper')}>
            <Header  avt_src={avt_src} setReset={setReset}/>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;