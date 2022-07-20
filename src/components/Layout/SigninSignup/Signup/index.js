import {Link} from 'react-router-dom'

import { faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "../FormSignin/FormSignin.module.scss"

const cx = classNames.bind(styles)


function Signup() {

    const city = ['Đà Nẵng', 'Hồ Chí Minh', 'Hà Nội', 'Quảng Nam', 'Huế', 'Quảng Bình', 'Bình Định', 'Thanh Hóa']
    const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const month = [1,2,3,4,5,6,7,8,9,10,11,12]
    const year = [1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,]
    const major = ['Công nghệ phần mềm', 'Big data & machine learning', 'AI', 'An ninh mạng', 'Du lịch', 'Quảng trị kinh doanh']
    
    return ( 
        <div className={cx('wrapper', 'wrapper-signup')}>
            <h2>Đăng ký</h2>
            <div className={cx('line-cross')}></div>

            <div className={cx('form-signup')}>
                <div className={cx('left-form')}>
                    <div>
                        <label className={cx('sigup-label')}>Mã sinh viên:</label>
                        <input className={cx('signup-input')} type='text' placeholder="Mã sinh viên"/>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>Họ và Tên:</label>
                        <input className={cx('signup-input')} type='text' placeholder="Mã sinh viên"/>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>Email:</label>
                        <input className={cx('signup-input')} type='text' placeholder="Tên đăng nhập"/>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>mật khẩu:</label>
                        <input className={cx('signup-input')} type='password' placeholder="mật khẩu"/>
                    </div>
                    <div>
                        <label className={cx('sigup-label')}>nhập lại mật khẩu:</label>
                        <input className={cx('signup-input')} type='password' placeholder="nhập lại mật khẩu"/>
                    </div>

                </div>
                <div className={cx('right-form')}>
                    <div>
                        <p className={cx('sigup-label')}>Giới tính:</p>
                        <input type="radio" id="html" name="gender" value="male"/>
                        <label htmlFor="html">Nam</label>
                        <input type="radio" id="css" name="gender" value="female"/>
                        <label htmlFor="css">Nữ</label>
                    </div>

                    <div>
                        <label className={cx('sigup-label')}>mật khẩu:</label>
                        <select >
                            {day.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select>
                        <select >
                            {month.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select><select >
                            {year.map((item, index)=> <option key={index} className={cx('option-item')} value={item}>{item}</option>)}
                        </select>

                    </div>

                    <div>
                        <label className={cx('sigup-label')} htmlFor="">Nơi sinh: </label>
                        <select >
                            {city.map((item, index)=> <option key={index} value={item}>{item}</option>)}
                        </select>

                    </div>

                    <div>
                        <label className={cx('sigup-label')} htmlFor="">Chuyên ngành: </label>
                        <select >
                            {major.map((item, index)=> <option key={index} value={item}>{item}</option>)}
                        </select>

                    </div>

                </div>
            </div>

            <button className={cx('btn-main', 'login-btn-custom')}>Đăng ký</button>

            <br/>

            <Link to='/signin' replace className={cx('btn-sub')} >
                <FontAwesomeIcon icon={faAnglesLeft}/>   <span>Đăng nhập</span>
            </Link>

            
        </div> 
    );
}

export default Signup;