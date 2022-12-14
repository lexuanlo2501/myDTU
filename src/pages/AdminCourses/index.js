import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";



import classNames from "classnames/bind";
import styles from './AdminCourses.module.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import TableModifyClasses from "../../components/TableModifyClasses";
axios.defaults.withCredentials = true;


const cx = classNames.bind(styles)

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function AdminCourses() {

    const [semester, setSemester] = useState("1")
    const [class_name, setClass_name] = useState("1")

    const [from_to, setFrom_to] = useState({"ending_week": 8, "starting_week": 1})
    const [signUpTime, setSignUpTime] = useState({})
    const [timeAndplace, setTimeAndplace] = useState([])
    const [lecturer, setLecturer] = useState([])
    const [avaible_seats, setAvaible_seats] = useState(0)
    


    // add course
    const [courseID_select_add, setCourseID_select_add] = useState('')
    // const [courses_add, setCourses_add] = useState([])
    const [coursesByID, setCoursesByID] = useState([])
    const [courseAdd_Class, setCourseAdd_Class] = useState({})
    const [week_daySelect, setWeek_daySelect] = useState([])
    const [lecturerAdd, setLecturerAdd] = useState('')
    
    // check
    const [errorMessages, setErrorMessages] = useState([])
    const [rooms, setRooms] = useState([])


    // search course
    const [courseID_select, setCourseID_select] = useState('')
    const [courses, setCourses] = useState([])

    const [classesByID, setClassesByID] = useState([])
    const [idClass_check, setIdClass_check] = useState('')


// constant
    const courseIDs = ['ACC','ACC-A','AES','AET','AHI','ANA','APY','ARC','ART','AUD','AUD-A','BCH','BIO','BME','BNK','BNK-A','BPH','CHE','CHI','CIE','CIE-A','CMU-COM','CMU-CS','CMU-ENG','CMU-IS','CMU-SE','COM','COM-A','CR','CS','CS-A','CSN','CSU-ARC','CSU-CHE','CSU-CIE','CSU-EE','CSU-ENG','CSU-HYD','CSU-MEC','CSU-PHY','CSU-THR','CUL','DEN','DMS','DS','DTE','DTE-ACC','DTE-AET','DTE-ARC','DTE-BA','DTE-CIE','DTE-EE','DTE-EVR','DTE-FSE','DTE-HSS','DTE-HT','DTE-IS','DTE-IT','DTE-LAW','DTE-LIN','DTE-MED','DTE-NUR','DTE-PHM','DTU','DTU-ACC','DTU-AES','DTU-ART','DTU-BIO','DTU-CHI','DTU-COM','DTU-CS','DTU-CUL','DTU-DMS','DTU-DTE','DTU-ECO','DTU-ENG','DTU-EVR','DTU-GEO','DTU-HIS','DTU-IS','DTU-JOU','DTU-MGT','DTU-MKT','DTU-MTH','DTU-PHI','DTU-PSY','DTU-SE','DTU-STA','ECL','ECO','ECO-A','EE','ENG','ENG-A','ENT','ES','EVR','EVT','FIN',
    "FIN-A","FSE","FSH","FST","GEO","GLY","HIS","HOS","HRM","HRM-A","HYD","IB","ID","IE","IMD","IMN","INR","IS","IS-A","IS-ACC","IS-AHI","IS-ART","IS-BIO","IS-CHE","IS-CHI","IS-COM","IS-CR","IS-CS","IS-CUL","IS-DMS","IS-DTE","IS-ECL","IS-ECO","IS-ENG","IS-EVR","IS-FIN","IS-GEO","IS-HIS","IS-HOS","IS-IB","IS-IS","IS-LIT","IS-MGO","IS-MGT","IS-MKT","IS-MTH","IS-PHI","IS-PHY","IS-POS","IS-PSY","IS-STA","IS-TOU","ITD","JAP","JOU","KC-BUS","KC-FIN","KC-FP","KC-HRM","KC-INS","KC-LA","KC-MGT","KC-MIS","KC-MKT","KOR","LAW","LAW-A","LIN","LIT","MCC","MCH","MEC","MEC-A","MED","MET","MGO","MGO-A","MGT","MGT-A","MIB","MKT","MKT-A","MLT","MT","MTH","NTR","NUR","OB","OPT","PGY","PHC","PHI","PHI-A","PHM","PHY","PMY","PNU-CR","PNU-CS","PNU-EE","PNU-HYD","PNU-IE","PNU-MEC","POS","PSU-ACC","PSU-AUD","PSU-BNK","PSU-COM","PSU-CSN","PSU-ECO","PSU-ENG","PSU-FIN","PSU-HOS","PSU-HRM",
    "PSU-IB","PSU-IS","PSU-MGO","PSU-MGT","PSU-MKT","PSU-OB","PSU-TOU","PSY","PTH","PTY","REM","SCM","SE","SE-A","SOC","SPM","STA","SUR","THE","THR","TOU","TOX","TROY-CS","TROY-ENG","TROY-HRM","TROY-HSTM","TROY-MGT","TROY-MTH","VIE",]

    const week_dayConst = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"]

    // add class for lecturers
    useEffect(() => {
        if(courseID_select_add) {
            axios.get('http://localhost:5000/root/courses')
            .then(res => {
                setCoursesByID(res.data.content.map((i) => {
                    if(i.group === courseID_select_add) return i
                }))

                // filter undefine
                setCoursesByID(pre => pre.filter(i => i))
            })
            .catch( err => {
                setCoursesByID([])
                // console.log(err)
            })
        }


    }, [courseID_select_add])


    useEffect(() => {
        if(courseID_select) {
            // axios.get(`http://localhost:5000/root/courseGroup/${courseID_select}`)
            axios.get(`http://localhost:5000/course-groups`)

            .then((res) => {
                let classes = res.data.find(i => i.group_id === courseID_select)
                console.log(classes)
                setCourses(classes.courses)
            })
            .catch((err) => {
                // console.log(err)
                setCourses([])
    
            })
        }
       
    }, [courseID_select])


    // useEffect(() => {
    //     if(courseID_select_add) {
    //         axios.get(`http://localhost:5000/root/courseGroup/${courseID_select_add}`)
    //         .then((res) => {
    //             setCourses_add(res.data.content.courses)
    //         })
    //         .catch((err) => {
    //             // console.log(err)
    //             setCourses_add([])
    //         })
    //     }
    // }, [courseID_select_add])

    const [detailCancelWeek, setDetailCancelWeek] = useState([{}])


    const handleSubmit = () => {

        let roomsAdd = Array.from($$('.room')).map(i => i.value)
        let adressAdd = Array.from($$('.adress_add')).map(i => i.value)

        // cancle week: convert string to arr
        let arrTest = Array.from($$('.cancel_weeks')).map(i => i.value)
        let abort = arrTest.find(i => i!=='') ? arrTest.map((item, index) => {
            return stringToArray(item)
        }) : []

        setDetailCancelWeek([])
        setDetailCancelWeek(week_daySelect.map((item, index) => {
            return {
                "week_day": week_dayConst[item],
                "abort": abort[index]
            }
        }))
        

        // list node element 
        let inputIsFill = Array.from($$("input")).map(i => i.value)

        let class_add = {}
        if(inputIsFill.every(i => i !== '') && courseAdd_Class._id) {
            class_add = {
                "class_status": "Lớp Học Chưa Bắt Đầu",
                "_id": `${courseAdd_Class['_id']}${class_name}_${handleDate(new Date(), "not")}`,
                "content_type": "Thông tin lớp học",
                "signUpCode": $('#sign_up_code').value,
                "group_name": courseAdd_Class.group,
                "course": `${courseAdd_Class['_id'].replace('_', ' ')} – ${courseAdd_Class.course_name}`,
                "class_name": `${courseAdd_Class['_id'].replace('_', ' ')} ${class_name}`,
                "class_type": courseAdd_Class.course_type,
                "credits": courseAdd_Class.course_credits,
                "semester": semester,
                "year": "Năm Học 2022-2023",
                "lecturer": lecturer,
                "remaining_seats": 0,
                "avaible_seats": parseInt(avaible_seats),
                "occupied_seats": parseInt(avaible_seats),
                "available": true,
                "signUpTime": `${signUpTime.start}-${signUpTime.end}`,
                "from_to": from_to,
                "timeAndplace": week_daySelect.map((item, index) => 
                    {return{
                        "week_day":week_dayConst[item],
                        // "time":$("#appt_from").value+"-"+$("#appt_to").value,
                        "time":$('#time_class').value,
                        "place": "P. " + roomsAdd[index] + ", " + adressAdd[index],
                    }}
                ),
                "cancel_weeks": week_daySelect.map((item, index) => {
                    return {
                        "week_day": week_dayConst[item],
                        "abort": abort[index]
                    }
                }),
                "prerequisite_course": courseAdd_Class.prerequisite_course,
                "parallel_subjects": courseAdd_Class.parallel_subjects,
            }

            // console.log(class_add)

            axios.post('http://localhost:5000/root/addClass',class_add)
            .then((res) => {
                console.log(res)
                if(res.statusText === 'OK') {
                    alert(res.data.message)
                }
            })
        }
        else {
            // throw erorr message
            setRooms( Array.from($$(".room")).map(i => i.value) )

            let IdInput = Array.from( $$( "input" ) ).map(i => {
                if(!i.value) return i.id
                
            }).filter(i => i)

            let errorMessageList = IdInput.map(i => {
                if(i != '') return $( `label+#${i}` ).previousSibling.innerHTML
            })
            setErrorMessages(errorMessageList)

            console.log({"error message": errorMessageList})
            console.log('vui long nhap day du')
        }
        // console.log(courseAdd_Class)
       

        // console.log(roomsAdd)
        // console.log(adressAdd)


    }

    const handleSearch = () => {
    //    axios.get('http://localhost:5000/root/classes') 
       axios.get('http://localhost:5000/classes')
       .then(res => {

            // setClassesByID(res.data.content.map((i) => {
            //     if(i['course'].slice(0,7) === idClass_check) return i
            // }))

            setClassesByID(res.data.filter(i => i.course_id === idClass_check))
            // console.log(res.data.filter(i => i.course_id === idClass_check))


            // filter undefine
       })
       .catch(err => {
            setClassesByID([])
       })
    }

    const handleDate = (d,type) => {

        let today = d;
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        // let date = 
        if(type==="not")
            return dd+mm+yyyy
        if(type==="mdy")
            return mm + '/' + dd + '/' + yyyy

        return dd + '/' + mm + '/' + yyyy
    }

    const delSpace = (para) => {
        let result = ''
        for(let i = 0; i<para.length; i++) {
            if(para[i] === para[i+1] && para[i] === ' ') {
                result = result
            }
            else {
                result += para[i]
            }
        }
        if(result[0] === ' ') result = result.slice(1)
        if(result[result.length-1] === ' ') result = result.slice(0, result.length-1)
        return result
    }
    const stringToArray = (str) => {
        str = delSpace(str)
        if(str === "") return []
        return (str.replace(/ /g, ',')).split(',').map(i => JSON.parse(i))
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('add_infor_class')}>
                <div className={cx('left-side')}>
                    <select
                        onChange={(e) => {
                            // console.log(e.target.selectedIndex)
                            console.log(e.target.value)

                            setCourseID_select_add(e.target.value)
                        }}
                    >
                        <option value="">--chọn mã ngành--</option>
                        {
                            courseIDs.map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </select>

                    <Table 
                        fieldName={["mã môn học","tên lớp","loại hình","số tín chỉ","môn tiên quyết","môn song hành"]}
                        value={coursesByID}
                        keys={["_id",
                            "course_name",
                            "course_type",
                            "course_credits",
                            "prerequisite_course",
                            "course_description"
                        ]}
                        setCourseAdd_Class={setCourseAdd_Class}
                        isActive
                    >
                    </Table>

                </div>
                
                <div className={cx('right-side')}>

                    <div className={cx('input-block')}>
                        <label>tên lớp</label>
                        <input id='class_name' type='text'
                            onChange={(e) => {setClass_name(e.target.value)}}
                        />
                    </div>

                    <div className={cx('input-block')}>
                        <label>mã đăng ký</label>
                        <input id='sign_up_code' type='text'/>
                    </div>

                    <div className={cx('input-block')}>
                        <label>giảng viên</label>
                        <input id='lecturer' type='text'
                            value={lecturerAdd}
                            onChange={(e) => 
                                setLecturerAdd(e.target.value)
                            }
                        />
                        <FontAwesomeIcon 
                            className={cx('lecturer_add')} icon={faCirclePlus}
                            onClick={() => {
                                lecturerAdd !== "" && lecturerAdd !== " " && setLecturer(pre => [...pre, lecturerAdd])
                                setLecturerAdd(" ")
                            }}
                        />
                        <div className={cx('lecturer_list')}>
                            {lecturer.map((item, index) => 
                                <p key={index}>
                                    {item} 
                                    <FontAwesomeIcon className={cx('lecturer_del_btn')} icon={faCircleXmark}
                                        onClick={() => {
                                            let newArr = [...lecturer]
                                            newArr.splice(index, 1)
                                            setLecturer(newArr)
                                        }}
                                    /> 
                                </p>
                            )}
                        </div>

                    </div>

                    <div className={cx('input-block')}>
                        <label>số chỗ ngồi</label>
                        <input id='remaining_seats' type='text'
                            onChange={(e) => {
                                setAvaible_seats(e.target.value)
                            }}
                        />
                    </div>
                    <div className={cx('input-block')}>
                        <label>trạng trái</label>
                        <select id='availabel'>
                            <option value='1'>còn</option>
                            <option value=''>hết</option>
                        </select>
                    </div>
                    <div className={cx('input-block')}>
                        <select
                            onChange={(e) => {
                                setSemester(e.target.value)
                            }}
                        >
                            <option value='I'>kì I</option>
                            {/* <option value='II'>kì II</option>
                            <option value='hè'>kì hè</option> */}
                        </select>
                    </div>

                    <div className={cx('input-block')}>
                        <label>tuần học</label>
                        {semester==='1' && 
                        <select
                            onChange={(e) => {
                                setFrom_to(pre => {return{...pre, 'starting_week':JSON.parse(e.target.value)[0],'ending_week':JSON.parse(e.target.value)[1]}})
                            }}
                        >
                            <option value={"[1,8]"}>1 - 8</option>
                            <option value={"[1,18]"}>1 - 18</option>
                            <option value={"[1,17]"}>1 - 17</option>
                            <option value={"[11,14]"}>11 - 14</option>
                            <option value={"[11,15]"}>11 - 15</option>
                            <option value={"[11,17]"}>11 - 17</option>
                            <option value={"[11,18]"}>11 - 18</option>
                        </select>}
                        {semester==='2' && 
                            <select
                            onChange={(e) => {
                                setFrom_to(pre => {return{...pre, 'starting_week':JSON.parse(e.target.value)[0],'ending_week':JSON.parse(e.target.value)[1]}})
                            }}
                        >
                            <option value={"[25,32]"}>25 - 32</option>
                            <option value={"[25,41]"}>25 - 41</option>
                            <option value={"[25,42]"}>25 - 42</option>
                            <option value={"[25,39]"}>25 - 39</option>
                            <option value={"[26,43]"}>26 - 43</option>
                            <option value={"[26,33]"}>26 - 33</option>
                            <option value={"[26,39]"}>26 - 39</option>
                            <option value={"[27,32]"}>27 - 32</option>
                            <option value={"[35,42]"}>35 - 42</option>
                            <option value={"[36,43]"}>36 - 43</option>
                        </select>}
                        
                        {semester==='3' && 
                        <select
                            onChange={(e) => {
                                setFrom_to(pre => {return{...pre, 'starting_week':JSON.parse(e.target.value)[0],'ending_week':JSON.parse(e.target.value)[1]}})
                            }}
                        >
                            <option value={"[43,49]"}>43 - 49</option>
                            <option value={"[46,49]"}>46 - 49</option>
                            <option value={"[46,49]"}>44 - 49</option>
                        </select>}
                    </div>

                    <div className={cx('input-block')}>
                        <label>from_to</label>
                        <input type="date"
                            onChange={(e) => {
                                setFrom_to(pre => {return {...pre,"starting_date": handleDate(new Date(e.target.value), "mdy")}})
                            }}
                        />
                        <input type="date"
                           onChange={(e) => {
                                setFrom_to(pre => {return {...pre,"ending_date": handleDate(new Date(e.target.value), "mdy")}})
                            }}
                        />
                    </div>

                    <div className={cx('input-block')}>
                        <label>sign Up Time</label>
                        <input type="date"
                            onChange={(e) => {
                                setSignUpTime(pre => {return {...pre,"start": handleDate(new Date(e.target.value))}})
                            }}
                        />
                        <input type="date"
                            onChange={(e) => {
                                setSignUpTime(pre => {return {...pre,"end": handleDate(new Date(e.target.value))}})
                            }}
                        />
                    </div>

                    <div className={cx('input-block')}>
                        <div className={cx('chose_weekDay')}>
                            {
                                [2,3,4,5,6,7,'cn'].map((item, index) => 
                                    <span key={index}
                                        className={cx(week_daySelect.find(i=> {return i === index}) !== undefined ? "day_select":"")}
                                        onClick={() => {
                                            week_daySelect.find(i=> {return i === index}) !==undefined ? 
                                            setWeek_daySelect(pre => {return pre.filter(i => i!==index)}) : setWeek_daySelect(pre => {return [...pre,index].sort()})
                                        }}
                                    >{item}
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className={cx('input-block')}>
                        <label>nơi học</label>
                        

                        {week_daySelect.map((item, index) => 
                            <div key={index}>
                                <label>- {week_dayConst[item]}</label>
                                <PlaceClass/>
                                <input style={{width: "68px"}} className={'room'} type="text" placeholder="phòng"/>
                                <br/>
                                <label>tuần hủy</label>
                                <input style={{width: "247px"}} className="cancel_weeks" type="text" placeholder="1 3 4...(nhập cách để trống)"/>
                            </div>
                        )}
                    </div>

                    <div className={cx('input-block')}>
                        <label>Thời gian</label>
                        <select id="time_class">
                            {
                                ['7:00-9:00', '9:15-11:15', '13:00-15:00', 
                                '13:00-16:15', '13:00-17:15', '15:15-17-15', '17:45-21:00'].map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })
                            }
                        </select>
                    </div>

                    
                </div>

            </div>

            <div className={cx('footer_inforInput_class')}>
                <div className={cx('error_message')}>
                    {errorMessages[0] ? <p>vui lòng nhập những thông tin này:   </p> : <p></p>}
                    <ul>
                        { errorMessages.map((item, index) => <li key={index}>{item}, </li>) }
                        { detailCancelWeek[0] ? <></> : <li>thứ ngày</li> }
                        { rooms.every(i => i) ? <></> : <li>số phòng</li> }

                    </ul>
                </div>

                <button className={cx('addClass_btn')} onClick={() => {handleSubmit()}}>thêm</button>

            </div>

            <div className={cx('panel')}>
                <div className={cx('chose-course')}>

                    <select
                        onChange={(e) => {
                            setCourseID_select(e.target.value)
                            console.log(e.target.value)
                            // console.log(e.target.selectedIndex)
                        }}
                    >
                        <option value="">--chọn mã ngành--</option>
                        {
                            courseIDs.map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </select>

                    <select
                        onChange={(e) => {
                            // let id = e.target.value.slice(0, 7)
                            let id = e.target.value.split(" - ")

                            
                            setIdClass_check(id[0])
                            console.log(id[0])

                        }}
                    
                    >
                        <option value="">--chọn môn học--</option>
                        {courses.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>

                    <button onClick={() => {handleSearch()}}>tìm kiếm</button>

                </div>

                <div>
                    <TableModifyClasses
                        isDeleteClass = {
                            classesByID.map((item) => {
                                return item._id
                            })
                        }
                        isUpdateClass = {
                            classesByID.map((item) => {
                                return item._id
                            })
                        }
                        modify_DelUpd = {
                            classesByID.map((item) => {
                                return item._id.$oid
                            })
                        }

                        fieldName={[ 
                            "tên lớp",
                            "mã đăng ký",
                            "loại hình",
                            "tuần học",
                            "thời gian",
                            "giảng viên",
                            "chỗ ngồi",
                            "số TC",
                        ]}
                        
                        setCourseAdd_Class={setCourseAdd_Class}
                        
                        value={
                            classesByID.map((item, index) => {
                                return {
                                    "class_id" : item.class_id,
                                    "signUpCode" : item.signUpCode,
                                    "class_type" : item.class_type,
                                    "from_to" : [ item.from_to.starting_week, item.from_to.ending_week],
                                    // "time" : item.timeAndplace.map(i => { return {
                                    //         'dayC': i.week_day,
                                    //         'timeC': i.time,
                                    //         'placeC':i.place
                                    //     }
                                    // }),
                                    "time" : item.timeAndplace,
                                    "lecturer" : item.lecturer.map(i => i.full_name),
                                    "avaible_seats" : item.avaible_seats,
                                    "credits" : item.credits
                                }
                            })
                        }
                    >
                    </TableModifyClasses>
                    
                </div>
            </div>


           
            
        </div>);
}

function PlaceClass() {
    const adress = ["03 Quang Trung","254 Nguyễn Văn Linh","209 Phan Thanh",
    "Hòa Khánh Nam - Tòa Nhà A",
    "Hòa Khánh Nam - Tòa Nhà B",
    "Hòa Khánh Nam - Tòa Nhà C",
    "Hòa Khánh Nam - Tòa Nhà D",
    "Hòa Khánh Nam - Tòa Nhà F",
    "Hòa Khánh Nam - Tòa Nhà E",
    "Online"]

    return ( 
        <select className="adress_add">
            {adress.map((item, index) => 
                <option key={index} value={item}>{item} </option>
            )}
        </select>
    )
}

export default AdminCourses;