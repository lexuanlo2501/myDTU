import classNames from "classnames/bind";
import styles from './TableModifyClasses.module.scss'

import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import axios from "axios";




const cx = classNames.bind(styles)

const isObject = (ob) => {
    if(typeof ob === 'object' && !Array.isArray(ob) && ob !== null) 
    {
        return true
    }
    return false
}


function TableModifyClasses({fieldName, value, keys, modify_DelUpd}) {

    const [show, setShow] = useState(false);
    const [classId, setClassId] = useState('')
    const [className, setClassName] = useState('')
    const [signUpCode, setSignUpCode] = useState('')


    const handleClose_delete_modal = () => setShow(false);
    const handleShow_delete_modal = () => setShow(true);

    const [show_update, setShow_update] = useState(false);
    const handleClose_update_modal = () => setShow_update(false);
    const handleShow_update_modal = () => setShow_update(true);

    // 
    const [isModyfy, setIsmodify] = useState(999)

    // temporary value to update

    const [class_name_U, setClass_name_U] = useState('')
    const [signUpCode_U, setSignUpCode_U] = useState('')
    const [class_type_U, setClass_type_U] = useState('')
    const [from_to_U, setFrom_to_U] = useState({})
    const [time_U, settime_U] = useState('')
    const [place_U, setplace_U] = useState({})
    const [lecturer_U, setLecturer_U] = useState('')
    const [avaible_seats_U, setAvaible_seats_U] = useState('')
    const [available_U, setAvailable_U] = useState('')
    const [credits_U, setCredits_U] = useState('')

    const containTemporaty = [
        {state: class_name_U, setState: setClass_name_U},
        {state: signUpCode_U, setState: setSignUpCode_U},
        {state: class_type_U, setState: setClass_type_U},
        {state: from_to_U, setState: setFrom_to_U},
        {state: time_U, setState: settime_U},
        {state: place_U, setState: setplace_U},
        {state: lecturer_U, setState: setLecturer_U},
        {state: avaible_seats_U, setState: setAvaible_seats_U},
        {state: available_U, setState: setAvailable_U},
        {state: credits_U, setState: setCredits_U},
    ]


    let keys_ob = value[0] && Object.keys(value[0])


    let keysToRender = value && Boolean(value.length) && keys || keys_ob

    const isObject = (ob) => {
        if(typeof ob === 'object' && !Array.isArray(ob) && ob !== null) 
        {
            return true
        }
        return false
    }


    const isList = (arr, direc) => {
        if(Array.isArray(arr)){

            if(isObject(arr[0])) {
                return (
                    <>{
                        arr.map((item, index) => {
                            let keyObj = Object.keys(item)
                            return <p key={index}>
                            {
                                keyObj.map((itemKey, indexKey) => <span key={index}>{item[itemKey]} | </span>)
                            }
                            </p>
                        })
                    }</>
                )
            }
            
            return <>
                {arr.map((item, index) => <p key={index}>
                    - {item}
                </p>)}
            </>
            
        }
        
        return arr
    }

    const handleSelectClass_toModify = (value, indexF) => {
        let idClass = modify_DelUpd[indexF]
        setClassId(idClass)
        setClassName(value[indexF].class_id)
        setSignUpCode(value[indexF].signUpCode)
    }
    

    return (<div>
        <table>
            <tr>
               {
                    fieldName.map((item, index) => {
                        return <td className={cx('field_name')} key={index}>{item}</td>
                    })
                }
                <td>xóa</td>
                <td>sửa</td>
            </tr>
            {
                value && Boolean(value.length) && value.map((item, index) => { /** item is value of arr(value) */
                    return (
                        <tr key={index}>
                        {
                            keysToRender.map((item2, index2) => /** item2 is key of obj */
                               isModyfy === index 
                               ? 
                            //    <td key={index2}> 
                            //     {
                            //         /** return input tag for update */
                            //         Array.isArray( item[item2]  ) && isObject(item[item2][0])/** check giá trị của thông tin lớp học (value) là array */
                            //         ? 
                            //         <Modify_placeAndWeekday week_days={item[item2].map(i => i.week_day)}  
                            //             placeRoomCancelW={item[item2]}
                            //         /> /** nuế item[item] là mảng object */
                            //         : 
                            //             Array.isArray( item[item2]  ) /** tiếp tục so sánh toán tử 3 ngôi bậc 2 (nếu là array và item trong arr k phải obj thì render theo điều kiệu 3 ngôi) */
                            //             ?
                            //             item[item2].map((itemList, indexList) => {
                            //                 return (
                            //                     <input className="inputArr" key={indexList} placeholder={itemList}
                            //                         onChange={e => {
                            //                             let keyObj = 'key_'+indexList   
                            //                             containTemporaty[index2].setState( pre => {return {...pre, [keyObj]: e.target.value}} )
                            //                         }}
                            //                     />
                            //                 )
                            //             })
                            //             :
                            //             <input placeholder={item[item2]}
                            //                 onChange={e => {
                            //                     containTemporaty[index2].setState(e.target.value)
                            //                 }}
                            //             />
                            //     } 
                            //     </td> 
                                <Td_update_class key_value={index2} value_item={item[item2]} containTemporatyP={containTemporaty}/>
                                : 
                                <td key={index2}>{ isList(item[item2]) }</td> 
                            )
                        }

                        { 
                            modify_DelUpd &&
                            <td
                                key={523}
                                className={cx('deleteClass_btn')}
                                onClick={() => {
                                    console.log(modify_DelUpd)
                                    handleSelectClass_toModify(value, index)
                                    handleShow_delete_modal()

                                }}
                            >
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </td>
                        }

                        {
                            modify_DelUpd &&
                            <>
                            {
                                isModyfy === index ?
                                <td
                                    className={cx('update_btn')}
                                    onClick={() => {
                                        handleSelectClass_toModify(value, index)
                                        handleShow_update_modal()

                                        console.log({
                                            'class_id': class_name_U, 
                                            'signUpCode': signUpCode_U, 
                                            'class_type': class_type_U, 
                                            'from_to': Object.values(from_to_U), 
                                            'time': time_U, 
                                            'place': Object.values(place_U), 
                                            'lecturer': lecturer_U, 
                                            'avaible_seats': avaible_seats_U, 
                                            'available': available_U, 
                                            'credits': credits_U
                                        })
                                        console.log(keysToRender)
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('save')} icon={faFloppyDisk}/>
                                </td>
                                :
                                <td
                                    className={cx('update_btn')}
                                    onClick={() => {
                                        setIsmodify(index)
                                        const {...obj} = value[index]
                                        // console.log(class_name_U, signUpCode_U, class_type_U, from_to_U, time_U, place_U, lecturer_U, avaible_seats_U, available_U, credits_U)
                                        console.log('updating:',obj)
                                    
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('active_save')} icon={faPenToSquare}/>
                                </td>
                                
                            }
                            </>
                        }
                        </tr>)
                })
            }
        </table>
        { !value[0] &&
            <div className={cx('default')}>
                <img src="https://cdn-icons-png.flaticon.com/512/2821/2821739.png"/>
            </div>
        }

        {/* MODAL DELETE CLASS */}
        <Modal show={show} onHide={handleClose_delete_modal}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa lớp</Modal.Title>
            </Modal.Header>
            <Modal.Body>bạn có muốn xóa lớp {className}</Modal.Body>
            <Modal.Footer>
            <button className={cx('btn_modal')} onClick={handleClose_delete_modal}>
                đóng
            </button>
            <a className={cx(['btn_modal','active'])} 
                onClick={() => {
                    // handle delete
                    console.log(signUpCode)
                    axios.delete(`http://localhost:5000/root/deleleClass/${classId}`)
                    .then((res) => {
                            console.log(res)
                        })
                        
                        axios.delete(`http://localhost:5000/root/deleteSchedule/${classId}`)
                    .then((res) => {
                        console.log(res)
                    })
                    handleClose_delete_modal()
                }}
                href="http://localhost:3000/root/adminCourses"
            >
                xóa
            </a>
            </Modal.Footer>
        </Modal>

        {/* MODAL UPDATE CLASS */}
        <Modal show={show_update} onHide={handleClose_update_modal} animation={true} centered>
            <Modal.Header closeButton>
            <Modal.Title>
                <h2>Chỉnh Sửa Lớp {className}</h2>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div >
                    <p>ID: {classId}</p>
                    <p>Mã đăng ký: {signUpCode}</p>
                    <p>Tên lớp: {className}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button variant="secondary" onClick={handleClose_update_modal}
                className={cx('btn_modal')}
            >
                Close
            </button>
            <button variant="primary" 
                onClick={() => {
                    handleClose_update_modal()
                    setIsmodify(999)

                }}
                className={cx(['btn_modal', 'active'])}
            >
                Save Changes
            </button>
            </Modal.Footer>
        </Modal>


    </div> );
}

function Modify_placeAndWeekday({week_days, placeRoomCancelW}) {

    // slice Number of room
    // ("P. 505 , Hòa Khánh Nam - Tòa Nhà F".split(" , ")[0]).slice(-3)
    // place 
    // ("P. 505 , Hòa Khánh Nam - Tòa Nhà F".split(" , ")[1])


    const [week_daySelect, setWeek_daySelect] = useState([])
    const [placeTimeCancleW, setPlaceTimeCancleW] = useState([])


    const week_dayConst = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"]

    useEffect(() => {
    
        let week_days_arr = placeRoomCancelW.map( item => week_dayConst.indexOf(item.week_day) )
        setWeek_daySelect( week_days_arr )

        setPlaceTimeCancleW(placeRoomCancelW)
        console.log(placeRoomCancelW)
    }, [])
    
    return <div className={cx('wrapper_modifyPanel_PlaceWeekDay')} >
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
                        >
                            {item}
                        </span>
                    )
                }
            </div>
        </div>

        <div className={cx('input-block')}>
            {week_daySelect.map((item, index) => 
                <div key={index} className={cx('weekDay_cancelWeeks_room')}>
                    <label style={{width: "57px"}}>- {week_dayConst[item]}</label>
                    <PlaceClass valuePlace={placeRoomCancelW[index].place} index_value={index}/>
                    <input style={{width: "60px"}} className={'room'} type="text" 
                        placeholder={ placeRoomCancelW[index] &&  (placeRoomCancelW[index].place.split(" , ")[0]).slice(-3) } 
                        // slice Number of room
                        // ("P. 505 , Hòa Khánh Nam - Tòa Nhà F".split(" , ")[0]).slice(-3) => "505"
                    />
                    <br/>
                    <label>tuần hủy: </label>
                    <input style={{width: "230px"}} className="cancel_weeks" type="text" placeholder="1 3 4...(nhập cách để trống)"/>
                </div>
            )}
        </div>
    </div>

  
}

// component room and place
function PlaceClass({valuePlace, index_value}) {
    const adress = ["03 Quang Trung","254 Nguyễn Văn Linh","209 Phan Thanh",
    "Hòa Khánh Nam - Tòa Nhà A",
    "Hòa Khánh Nam - Tòa Nhà B",
    "Hòa Khánh Nam - Tòa Nhà C",
    "Hòa Khánh Nam - Tòa Nhà D",
    "Hòa Khánh Nam - Tòa Nhà F",
    "Hòa Khánh Nam - Tòa Nhà E",
    "Online"]

    useEffect(() => {
        // place 
        // ("P. 505 , Hòa Khánh Nam - Tòa Nhà F".split(" , ")[1]) => "Hòa Khánh Nam - Tòa Nhà F"
        document.querySelectorAll('.adress_add_update')[index_value].value = valuePlace.split(" , ")[1]
        
        // console.log(valuePlace.split(" , ")[1])
    }, [])
  
    

    return ( 
        <select className="adress_add_update" style={{width: "150px", margin: "0 7px"}}>
            {adress.map((item, index) => 
                <option key={index} value={item}>{item} </option>
            )}
        </select>
    )
}

// loading....
function Td_update_class({key_value, value_item, containTemporatyP }) {
    
    useEffect(() => {

    }, [])
    
    return (
        <td key={key_value}>
        {
            /** return input tag for update */
            Array.isArray( value_item  ) && isObject(value_item[0])/** check giá trị của thông tin lớp học (value) là array */
            ? 
            <Modify_placeAndWeekday week_days={value_item.map(i => i.week_day)}  
                placeRoomCancelW={value_item}
               
            /> /** nuế item[item] là mảng object */
            : 
                Array.isArray( value_item  ) /** tiếp tục so sánh toán tử 3 ngôi bậc 2 (nếu là array và item trong arr k phải obj thì render theo điều kiệu 3 ngôi) */
                ?
                value_item.map((itemList, indexList) => {
                    return (
                        <input className="inputArr" key={indexList} placeholder={itemList}
                            onChange={e => {
                                let keyObj = 'key_'+indexList   
                                containTemporatyP[key_value].setState( pre => {return {...pre, [keyObj]: e.target.value}} )
                            }}
                        />
                    )
                })
                :
                <input placeholder={value_item}
                    onChange={e => {
                        containTemporatyP[key_value].setState(e.target.value)
                    }}
                />
        } 
        </td>
    )
}

export default TableModifyClasses;