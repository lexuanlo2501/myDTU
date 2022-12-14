import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "../Signin/FormSignin.module.scss"

import axios from 'axios';
axios.defaults.withCredentials = true;


const cx = classNames.bind(styles)

function Signup() {

    const city = ['Đà Nẵng', 'Hồ Chí Minh', 'Hà Nội', 'Quảng Nam', 'Huế', 'Quảng Bình', 'Bình Định', 'Thanh Hóa']
    const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const month = [1,2,3,4,5,6,7,8,9,10,11,12]
    const year = [1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,]
    const major = ['Công nghệ phần mềm', 'Big data & machine learning', 'AI', 'An ninh mạng', 'Du lịch', 'Quảng trị kinh doanh']
    
    const [username, setUserName] = useState('2');
    const [password, setPassword] = useState('2');
    const [confirmPassword, setConfirmPassword] = useState('2');
    const [id, setId] = useState("2");
    const [fullName, setFullName] = useState('2');
    const [gender, setGender] = useState('2');
    const [dateOfBirth, setDateOfBirth] = useState('2');
    const [placeOfBirth, setPlaceOfBirth] = useState('2');
    const [studyMajor, setStudyMajor] = useState('2');

    const [message_confirm, setMessage_confirm] = useState('')

    const infor = [
        {state:username, setState:setUserName},
        {state:password, setState:setPassword},
        {state:confirmPassword, setState:setConfirmPassword},
        {state:id, setState:setId},
        {state:fullName, setState:setFullName},
        {state:gender, setState:setGender},
        {state:dateOfBirth, setState:setDateOfBirth},
        {state:placeOfBirth, setState:setPlaceOfBirth},
        {state:studyMajor, setState:setStudyMajor}
    ]

    const navigate = useNavigate()
    
    const errorMessage = {
        require: 'không thể để trống ô này',
        isNumber: 'yêu cầu chỉ nhập số'
    }


    const handleSignUp = () => {

        // check confirm password
        setMessage_confirm(confirmPassword==password ? '':'mật khẩu không khớp')


        infor.forEach((item, index) => {
            if(item.state === '2') {
                item.setState('')
            }
        })

        console.log({
            'study_major': studyMajor,
            'full_name': fullName,
            'email': username,
            'password': password,
            'gender':  gender,
            'Student_id': JSON.parse(id),
            'PlaceOfBirth':  placeOfBirth,
            'date_of_birth': dateOfBirth,
        })

        if(infor.find(i => i.state==='')) {
            return true
        }
        else if(password === confirmPassword) {
            axios.post('http://localhost:5000/register',{
                'study_major': studyMajor,
                'name': fullName,
                'email': username,
                'password': password,
                'gender':  gender,
                'Student_id': JSON.parse(id),
                'PlaceOfBirth':  placeOfBirth,
                'date_of_birth': dateOfBirth,
            })
            .then((res) => {
                console.log(res)
                if(res.data.message === 'Bạn đã đăng ký thành công'){
                    navigate('../login',  { replace: true })
                    alert(res.data.message)
                } 
            })
            .catch((err) => {console.log(err)})
        }


           

        
    }


    return (
        <div className={cx('wrapper', 'wrapper-signup')}>
            <h2>Đăng ký</h2>
            <div className={cx('line-cross')}></div>
            <div className={cx('form-signup')}>
                <div className={cx('left-form')}>
                    <div>
                        <label className={cx('sigup-label')}>Mã sinh viên:</label>
                        <input id='id' className={cx('signup-input',)} type='text' placeholder="Mã sinh viên"
                            onChange={e => {
                                setId(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{id ? '' : errorMessage.require}</p>
                        
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>Họ và Tên:</label>
                        <input id='fullName' className={cx('signup-input')} type='text' placeholder="họ và tên"
                            onChange={e => {
                                setFullName(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{fullName ? '' : errorMessage.require}</p>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>Email:</label>
                        <input id='email' className={cx('signup-input')} type='text' placeholder="Tên đăng nhập"
                            onChange={e => {
                                setUserName(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{username ? '' : errorMessage.require}</p>

                    </div>
                    <div>
                        <label className={cx('sigup-label')}>mật khẩu:</label>
                        <input id='password' className={cx('signup-input')} type='password' placeholder="mật khẩu"
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{password ? '' : errorMessage.require}</p>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>nhập lại mật khẩu:</label>
                        <input className={cx('signup-input')} type='password' placeholder="nhập lại mật khẩu"
                            onChange={e => {
                                setConfirmPassword(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{message_confirm}</p>
                    </div>
                    

                </div>
                <div className={cx('right-form')}>
                    <div>
                        <p className={cx('sigup-label')}>Giới tính:</p>
                        <input type="radio" id="radio-male" name="gender" value="male"
                            onChange={e => {
                                setGender(e.target.value)
                            }}
                        />
                        <label htmlFor="radio-male">Nam</label>
                        <input type="radio" id="radio-female" name="gender" value="female"
                            onChange={e => {
                                setGender(e.target.value)
                            }}
                        />
                        <label htmlFor="radio-female">Nữ</label>
                        <p className={cx('error_message')}>{gender ? '' : errorMessage.require}</p>
                    </div>

                    <div>
                        <label className={cx('sigup-label')}>Ngày sinh:</label>
                        {/* <select id='dayID' >
                            {day.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select>
                        <select id='monthID' >
                            {month.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select>
                        <select id='yearID' >
                            {year.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select> */}
                        <input type="date" id="birthday" name="birthday"
                            onChange={e => {
                                setDateOfBirth(e.target.value)
                            }}
                        />
                        <p className={cx('error_message')}>{dateOfBirth ? '' : errorMessage.require}</p>


                    </div>

                    <div>
                        <label className={cx('sigup-label')} htmlFor="">Nơi sinh: </label>
                        <select id='city'
                            onChange={e => {
                                setPlaceOfBirth(e.target.value)
                            }}
                        >
                            <option value=''>--thành phố--</option>
                            {city.map((item, index)=> <option key={index} value={item}>{item}</option>)}
                        </select>
                        <p className={cx('error_message')}>{placeOfBirth ? '' : errorMessage.require}</p>
                    </div>

                    <div>
                        <label className={cx('sigup-label')} htmlFor="">Chuyên ngành: </label>
                        <select id='major'
                            onChange={e => {
                                setStudyMajor(e.target.value)
                            }}
                        >
                            <option value=''>--chuyên ngành--</option>
                            {major.map((item, index)=> <option key={index} value={item}>{item}</option>)}
                        </select>
                        <p className={cx('error_message')}>{studyMajor ? '' : errorMessage.require}</p>
                    </div>

                </div>
            </div>

            <button onClick={handleSignUp} className={cx('btn-main', 'login-btn-custom')}>Đăng ký</button>

            <br/>

            <Link to='/login' replace className={cx('btn-sub')} >
                <FontAwesomeIcon icon={faAnglesLeft}/>   <span>Đăng nhập</span>
            </Link>

            
        </div> 
    );
}

export default Signup;