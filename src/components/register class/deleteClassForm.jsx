import {useState} from 'react';
import axios from 'axios';
import { TbTrashX } from "react-icons/tb";

function DeleteClassForm({classRegistered,getClassRegistered}){
    const 
        [deleteOption,setDeleteOption] = useState(null),
        [deleteError,setDeleteError] = useState(null),
        [removeClassId,setRemoveClassId] = useState(null),
        [deleteSuccess,setDeleteSuccess] = useState(null);

    return (

    <div className='removeClass' >
    <form >
    <h2 style={{textAlign:"center"}}>Bảng hủy đăng ký lớp học</h2>
    <label style={{marginTop:"30px"}} for="removeClass">Chọn lớp bên dưới để hủy đăng ký</label>
    <select name="class_id" onChange={(e)=>{
        setDeleteOption(e.target.value);
        console.log(e.target.value);
        }} >
    <option value="" disabled selected>Chọn 1 trong các lớp dưới đây</option>
    {
        classRegistered.map(classData=>(
        <option value={classData.class_id} >{`${classData.class_id} - ${classData.course_name}`}</option>
    )
    )
    }
    </select>
    <label style={{marginTop:"30px"}} for="removeClass">Nhập lại mã lớp để xác nhận</label>
    <input type="text" placeholder='Ví dụ: ABC 123 A' onChange={(e)=>{

    setRemoveClassId(e.target.value);
    setDeleteError(null);
    }
    }></input>
    <button id="remove-class-btn" disabled={!removeClassId} style={{backgroundColor: "#DC143C",'&:disabled':"color:black"}} onClick={(e)=>{
        e.preventDefault();
        if(!deleteOption.includes(removeClassId.trim())){
            setDeleteError('Mã xác nhận hủy đăng ký lớp không giống với mã lớp được chọn');
        }
        else {
            axios.delete('http://localhost:5000/student/removeClass',{data:{ class_id:deleteOption.trim()}})
            .then(response=>{
                console.log(response.data.message)
                setDeleteSuccess(response.data.message);
                
                getClassRegistered();

            })
            .catch(error=>{
                if(error.response) setDeleteError(error.response.data.errorLog);
            });

        }
    }}>Hủy đăng ký lớp <TbTrashX/></button>
    {
        deleteError ? <span style={{color:"red",textAlign:"center"}}>{`Hủy đăng ký lớp thất bại : ${deleteError}`}</span> :
        deleteSuccess ? <span style={{color:"#20B2AA",textAlign:"center"}}>{`Hủy đăng ký lớp thành công : ${deleteSuccess}`}</span> : ''  
    }
    </form>
    </div>
    )
}

export default DeleteClassForm;