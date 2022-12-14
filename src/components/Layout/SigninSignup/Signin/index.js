import classNames from "classnames/bind";
import { useState } from "react";
import { Link} from "react-router-dom";
import styles from './FormSignin.module.scss'
import { Navigate } from "react-router-dom";




import axios from "axios";
axios.defaults.withCredentials = true;



const cx = classNames.bind(styles)


function SignIn({setUser}) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [messageErr,setMessageErr] = useState('');

    

    const handleSubmit = () => {
         
        axios.post('http://localhost:5000/login',{
            'email':username,
            'password':password
        })
        .then((response) => {
            console.log(response);
            if (response.status === 200){
                setUser(response.data);
                localStorage.setItem('user',JSON.stringify(response.data));
                const {accessLevel} =  response.data;
                accessLevel === 3 ? <Navigate to="/Home"/>:
                accessLevel === 1 ? <Navigate to="/Admin"/>:
                console.log(accessLevel);
                <Navigate to="*"/>
                return response.data;
            } 
            else throw new Error("authentication has been failed!");
        })
        .catch((error) => {
            console.log(error);
            if(username === '' && password === '') {
                setMessageErr('vui lòng nhập thông tin đăng nhập')
            }else {
                setMessageErr(error.response.data.error)
            }
        })
        
    }

    return ( 

        <div className={cx('wrapper')}>

            <h2>Đăng Nhập</h2>
            <div className={cx('form-input')}>
                <label htmlFor="input1">Tài khoản:</label>
                <input id='input1' type='text' placeholder="Nhập tên đăng nhập ..." 
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            <div className={cx('form-input')}>
                <label htmlFor="input2">Mật khẩu:</label>
                <input id='input2' type='password' placeholder='Nhập mật khẩu ...' 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className={cx('btn-main')} onClick={handleSubmit}>Đăng nhập</button>

            <p className={cx('message-error')}>{messageErr}</p>
            
            <div className={cx('line')}></div>
            <Link to='/register' replace className={cx('btn-sub')} >Đăng ký</Link>

        </div>
     );
}


export default SignIn;