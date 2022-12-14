import classNames from "classnames/bind";
import styles from './table.module.scss'

import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import axios from "axios";




const cx = classNames.bind(styles)


function Table({fieldName, value, keys, setCourseAdd_Class, isActive}) {


    const [selectCourse, setSelectCourse] = useState(999)

   

 
   



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
                    <>
                    {
                        arr.map((item, index) => {
                            let keyObj = Object.keys(item)

                            return <p>
                            {
                                keyObj.map((itemKey, indexKey) => <span key={index}>{item[itemKey]} | </span>)
                            }
                            </p>
                            
                        })
                    }                
                    </>
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


    return (<div>
        <table>
            <tr>
               {
                    fieldName.map((item, index) => {
                        return <td className={cx('field_name')} key={index}>{item}</td>
                    })
                }
                {isActive && <td key={123} className={cx('field_chose')}>chọn</td>}
                
            </tr>
            {
                value && Boolean(value.length) && value.map((item, index) => {
                    return (
                        <tr key={index}>
                        {
                            keysToRender.map((item2, index2) => 
                                <td key={index2}> { isList(item[item2]) }</td>
                            )
                        }

                        {
                            isActive && 
                            <td 
                                key={456} 
                                className={cx('field_chose_value', selectCourse === index ? "select" : "")}
                                onClick={() => {
                                    setCourseAdd_Class(item)
                                    setSelectCourse(index)
                                }}
                            >
                                <FontAwesomeIcon icon={faCheckCircle}/>
                            </td>
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

     


    </div> );
}



export default Table;