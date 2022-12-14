import classNames from "classnames/bind";
import styles from './Header.module.scss'
// import Tippy from "@tippyjs/react";
import Tippy from '@tippyjs/react/headless';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState } from "react";


const cx = classNames.bind(styles)

function Header({setReset}) {

    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        navigate('/')
        setReset(pre => !pre)
        axios({
            method:'post',
            url: 'http://localhost:5000/logout',
            data:null,
        })
    }

    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-side')}>
                    <span className={cx('logo')}>MY DTU</span>
                    <ul>
                        <li><a href="">Trang chủ</a></li>
                        <li><a href="">DTU Mail</a></li>
                        <li><a href="">Learning</a></li>
                        <li><a href="">Forum</a></li>
                        <li><a href="">e-Lib</a></li>
                    </ul>
                </div>

                <div className={cx('right-side')}>
                    {/* <img className={cx('avatar')} src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1659608170~hmac=a9fc6792fcb20f8d7fa2205c606a5330"/> */}
                    <Tippy
                        trigger="click"
                        interactive
                        placement="bottom-end"	
                        render={(attrs) => (
                            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                                <ul>
                                    <li>thông tin cá nhân</li>
                                    <li>cài đặt</li>
                                    <li onClick={handleLogout}>đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    >
                        <img className={cx('avatar')} src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1659608170~hmac=a9fc6792fcb20f8d7fa2205c606a5330"/>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default Header;