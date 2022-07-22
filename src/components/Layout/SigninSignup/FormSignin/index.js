import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './FormSignin.module.scss'
import PropTypes from 'prop-types';

import axios from "axios";


const cx = classNames.bind(styles)

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function FormSignin({setToken}) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //       username,
    //       password
    //     });
    //     setToken(token);
    // }

    const handleSubmit = () => {
        // axios({
        //     method:'post',
        //     url: 'http://localhost:5000/login',
        //     data:{
        //         email: 'lexuanthang@gmail.com',
        //         password: '123456'
        //     },
        // }).then(res => {
        //     console.log(res)
        // })

        axios.post('http://localhost:5000/login', {
            email: username,
            password: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return ( 
        // <form className={cx('wrapper')} onSubmit={handleSubmit}>

        //     <h2>Đăng Nhập</h2>
        //     <div className={cx('form-input')}>
        //         <label htmlFor="input1">Tài khoản:</label>
        //         <input id='input1' type='text' placeholder="Nhập tên đăng nhập ..." 
        //             onChange={e => setUserName(e.target.value)}
        //         />
        //     </div>
        //     <div className={cx('form-input')}>
        //         <label htmlFor="input2">Mật khẩu:</label>
        //         <input id='input2' type='password' placeholder='Nhập mật khẩu ...' 
        //             onChange={e => setPassword(e.target.value)}
        //         />
        //     </div>
        //     <button className={cx('btn-main')} type="submit">Đăng nhập</button>

        //     <div className={cx('line')}></div>

        //     <Link to='/signup' replace className={cx('btn-sub')} >Đăng ký</Link>

        // </form>

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

            <div className={cx('line')}></div>

            <Link to='/register' replace className={cx('btn-sub')} >Đăng ký</Link>

        </div>
     );
}

FormSignin.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default FormSignin;