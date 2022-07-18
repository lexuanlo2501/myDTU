import { faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Signin from "../Signin";
import styles from "../Signin/Signin.module.scss"

const cx = classNames.bind(styles)

function Signup({onClick}) {
    return ( 
        <div className={cx('wrapper', 'wrapper-custom')}>
            <h2>Đăng ký</h2>

            <div className={cx('form-signup')}>
                <div>
                    <label className={cx('sigup-label')}>Mã sinh viên:</label>
                    <input className={cx('signup-input')} type='text' placeholder="Mã sinh viên"/>
                </div>
                <div>
                    <label className={cx('sigup-label')}>tên đăng nhập:</label>
                    <input className={cx('signup-input')} type='text' placeholder="Tên đăng nhập"/>
                </div>
                <div>
                    <label className={cx('sigup-label')}>mật khẩu:</label>
                    <input className={cx('signup-input')} type='text' placeholder="mật khẩu"/>
                </div>
                <div>
                    <label className={cx('sigup-label')}>nhập lại mật khẩu:</label>
                    <input className={cx('signup-input')} type='text' placeholder="nhập lại mật khẩu"/>
                </div>
            </div>

            <button className={cx('signup-btn', 'login-btn-custom')}>Đăng ký</button>

            <br/>

            <button className={cx('login-btn')} onClick={onClick}>
                <FontAwesomeIcon icon={faAnglesLeft}/>   <span>Đăng nhập</span>
            </button>

            
        </div> 
    );
}

export default Signup;