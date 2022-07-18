import classNames from "classnames/bind";
import { useState } from "react";
import styles from './Signin.module.scss'

const cx = classNames.bind(styles)

function Signin({onClick}) {


    return ( 
        <div className={cx('wrapper')}>
            <h2>Đăng Nhập</h2>
            <div className={cx('form-input')}>
                <label htmlFor="input1">Tài khoản:</label>
                <input id='input1' type='text' placeholder="Nhập tên đăng nhập ..."/>
            </div>
            <div className={cx('form-input')}>
                <label htmlFor="input2">Mật khẩu:</label>
                <input id='input2' type='password' placeholder='Nhập mật khẩu ...'/>
            </div>
            <button className={cx('login-btn')}>Đăng nhập</button>
            <div className={cx('line')}></div>

            <button className={cx('signup-btn')} onClick={onClick}>Đăng ký</button>

        </div>
     );
}

export default Signin;