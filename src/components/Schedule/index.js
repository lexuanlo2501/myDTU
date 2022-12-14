import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import styles from './schedule.module.scss'
import axios from "axios";
import Card from 'react-bootstrap/Card';

const cx = classNames.bind(styles)

function Schedule() {

    const [week, setWeek] = useState(0)
    const [userSchedule, setUserSchedule] = useState([])

    const dateWeek = [
        {
            key:"Chủ nhật",
            value:"sun"
        },
        {
            key:"Thứ hai",
            value:"mon"
        },
        {
            key:"Thứ ba",
            value:"tue"
        },
        {
            key:"Thứ tư",
            value:"wed"
        },
        {
            key:"Thứ năm",
            value:"thu"
        },
        {
            key:"Thứ sáu",
            value:"fri"
        },
        {
            key:"Thứ bảy",
            value:"sat"
        }
    ]

    useEffect(() => {
        axios.get("http://localhost:5000/student/getSchedule")
        .then(res => {
        setUserSchedule(res.data.User_Schedule);
    })
    
},[]);

/* useEffect(() => {
    axios.get("http://localhost:5000/getSchedule")
    .then(res => {
        console.log(res.data.content.User_Schedule[week-1].week_schedule)
        // console.log(res.data)
        setWeek_schedules(res.data.content.User_Schedule[week-1].week_schedule)
        
    })
    
},[week])*/

    console.log(userSchedule);
    //const week_schedule = userSchedule[week].week_schedule;
    const time = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']

    return <div className={cx('schedule')}>
        <div className={cx('week_navigate')}>
            <span className={cx('week_navigate__btn')} onClick={() => {week > 1 && setWeek(pre => pre-1)}}>-</span> 
            <span className={cx('week')}>{week}</span> 
            <span className={cx('week_navigate__btn')} onClick={() => {setWeek(pre => pre+1)}}>+</span>
        </div>

        <table>
            <tr>
                <th></th>
                <th>T2</th>
                <th>T3</th>
                <th>T4</th>
                <th>T5</th>
                <th>T6</th>
                <th>T7</th>
                <th>CN</th>
            </tr>
           

            {
                time.map((item, index) =>
                    <>
                        <tr >
                            <td className={cx("hour")}>
                                <span>{item}</span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr >
                            <td className={cx("hour")}></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr >
                            <td className={cx("hour")}></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr >
                            <td className={cx("hour")}></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </>
                )
            }
           
            <div className={cx(['card','mon','time_09', 'model_1'])}>
                <h5 style={{textAlign:"center"}}>POS 151 A</h5>
                <p>Triết học Marx - Lenin</p>
                <ul >
                    <li>P 308 K 7 /25 Quang Trung </li>
                    <li>09:15 - 11:00</li>
                </ul>
            </div>
           
            
            {/* <CardSchedule className='sun time_13'></CardSchedule>
            <CardSchedule className='fri time_7 _4h'></CardSchedule> */}

           {/*
                week_schedules.map((item, index) => {
                    let week_day = dateWeek.find(i => i.key === item.week_day)
                    // console.log(week_day.value)
                    // let className = week_day.value + ' time_7'
                    let className = week_day.value


                    // in map return map 
                    return item.day_schedule.map((item2, index2) => {
                        return <CardSchedule key={index2} className={className} inforClass={item2}></CardSchedule>
                    })
                })
           */}


            
           
            
        </table>
    </div>
}

function CardSchedule({className, inforClass}) {

    const class_name = className.split(' ')
    let time = 'time_' + inforClass.time.split(':')[0]
    let _h = Number(inforClass.time.slice(7,9))-Number(inforClass.time.slice(0,2))

    return <div className={cx(['card', time, `_${_h}h`, ...class_name]) }>
            <p>{inforClass.class_name} <span className={cx('class_name')}>{inforClass.course.slice(6)}</span></p>
            <p>{inforClass.place} | {inforClass.time}</p>
        </div>
}

export default Schedule
