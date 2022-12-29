import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import axios from "axios";
import { useState,useEffect } from "react";
import {  useNavigate , Link} from "react-router-dom";


const cx = classNames.bind(styles)

function Header({setUser}) {

    const navigate = useNavigate()
    const avt_src = JSON.parse(localStorage.getItem('avt_src'));
    const [notification,setNotification] = useState([]);
    const handleLogout = () => {
        axios.get('http://localhost:5000/logout')
        localStorage.removeItem("user")
        setUser({});
        return navigate('/login');
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/notifications')
        .then(response=>setNotification([...response.data]))
        .catch(e=>console.log(e));
        //console.log(notification);
    },[]);
    return ( 
       
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-side')}>
                    <span className={cx('logo')}>MY DTU</span>
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="*">DTU Mail</a></li>
                        <li><a href="*">Learning</a></li>
                        <li><a href="*">Forum</a></li>
                        <li><a href="*">e-Lib</a></li>
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
                                <ul style={{padding:"3px"}}>
                                    <li><a href="/personalInfo">thông tin cá nhân</a></li>
                                    <li><Link to='/notifications' state={{data:notification}}>Thông báo {notification.length!==0?<span style={{backgroundColor:"red",color:"white",width:"20%",borderRadius:"50%", textAlign:"center"}}>{notification.length}</span> : ''}</Link></li>
                                    <li>Trò chuyện</li>
                                    <li>cài đặt</li>
                                    <li onClickCapture={handleLogout}>đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    >
                        <img className={cx('avatar')} src={!avt_src ?"/default.png":`http://localhost:5000/${avt_src}`} alt="user-avatar"/>
                    </Tippy>
                </div>
            </div>
        </header> 
        
    );
}

export default Header;