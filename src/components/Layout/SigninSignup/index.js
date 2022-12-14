import classNames from "classnames/bind";
import styles from "./SigninSignup.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCircleQuestion, faEnvelopeOpen,
    
} from '@fortawesome/free-solid-svg-icons';
import OptionItem from "./OptionItem";


import { useState } from "react";

const cx = classNames.bind(styles)

const infor_option = [
    
    {
        title: '@dtu.edu.vn',
        icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    },
    {
        title: 'Learning',
        icon: 'https://cdn-icons-png.flaticon.com/512/7786/7786254.png',
    },
    {
        title: 'Đăng ký Môn học',
        icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    },
    {
        title: 'Thông báo',
        icon: 'https://cdn-icons-png.flaticon.com/512/1378/1378644.png',
    },
    {
        title: 'Thư viện',
        icon: 'https://cdn-icons-png.flaticon.com/512/3771/3771417.png',
    },
    {
        title: 'Học Phí',
        icon: 'https://cdn-icons-png.flaticon.com/512/2534/2534222.png',
    },
    {
        title: 'Lịch học',
        icon: 'https://cdn-icons-png.flaticon.com/512/3143/3143636.png',
    },
    {
        title: 'Diễn đàn',
        icon: 'https://cdn-icons-png.flaticon.com/512/745/745205.png',
    },
    {
        title: 'Bảng điểm',
        icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972160.png',
    },
    
]


function SigninSignup({children}) {

    let isOption = children.props.isOption
    
    return ( <div className={cx('wrapper')}>
        <div className={cx('login')}>
            <div className={cx('top')}>
                <div className={cx('logo')}>
                </div>
            </div>

            <div className={cx('main')}>

                <div className={cx('main__infor')}>
                    {
                        isOption && (
                            <div className={cx('option')}>
                                {
                                    infor_option.map((item, index) => {
                                        return <OptionItem key={index} title={item.title} icon={item.icon}/>
                                    })
                                }
                                
                            </div>

                        )
                        
                    }
                    <div className={cx('overlay')}></div>
                    <div className={cx('form')}>
                        {children}
                        {/* <FormSignin onClick={signup_page}/> */}
                    </div>
                   

                </div>



                <p className={cx('Copyright')}>Copyright© 2022 Đại học Duy Tân.</p>
            </div>
        </div>
    </div> );
}

export default SigninSignup;