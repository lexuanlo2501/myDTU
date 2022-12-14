import axios from 'axios';
import './index.css';
import {useEffect,useState,useRef} from 'react';
import SearchClass from './searchClass';
import { TbTrashX } from "react-icons/tb";
import { BsCheckCircle} from "react-icons/bs";

function RegisterClass(){
    const [classRegistered,setClassRegistered] = useState([]);
    const [signupCode,setSignUpCode] = useState(null);
    const [errorMessage,setErrorMessage] = useState(null);
    const [successMessage,setSuccessMessage] = useState(null);
    const [removeClassId,setRemoveClassId] = useState(null);
    const [deleteOption,setDeleteOption] = useState(null);
    const [deleteError,setDeleteError] = useState(null);
    const [deleteSuccess,setDeleteSuccess] = useState(null);
    const [groupList,setGroupList] = useState([]); 
    const ref = useRef(null);
    function getClassRegistered(){
        axios.get('http://localhost:5000/student/getRegisteredClasses')
            .then(res=>{
                console.log(res.data);
                setClassRegistered(res.data);
            })
            .catch(e=>console.log(e));
    }
    useEffect(() => {
        
        getClassRegistered();
        axios.get('http://localhost:5000/student/getAllCourseGroup')
        .then(response=>{

            setGroupList(response.data)
        })
        .catch(error=>console.log(error));
    }, []);
    return (
        <>
    <div className='container'>
    <form>
    <h2 style={{textAlign:"center"}}>Bảng đăng ký môn học</h2>
    <input  type="text" placeholder="Nhập mã đăng ký lớp học" onChange={(e)=>{setSignUpCode(e.target.value); setErrorMessage(null); setSuccessMessage(null)}}></input>
    <a style={{margin:"20px",color:"#6495ED",textAlign:"right"}} href="" onClick = {(e)=>{
        e.preventDefault(); 
        const element = document.querySelector('#search-form');
        if(element){
        element.scrollIntoView({behavior: 'smooth'});
        }
        }
    } alt="">Hoặc tìm kiếm môn học</a>
    <button  disabled={!signupCode} onClick={(e)=>{
        e.preventDefault();
        
         axios.post('http://localhost:5000/student/registerClass',{signUpCode:signupCode})
        .then(res=>{
            if(res){
            setSuccessMessage(res.data.message)
            getClassRegistered();
            }
        }).catch(error=>{

            if(error.response){
                setErrorMessage(error.response.data.errorLog);
                console.log(error.response)
            }
        });
        
    }}  >Đăng ký môn học <BsCheckCircle/></button>
    {errorMessage? <span style={{color:"red"}}>{`Đăng ký lớp thất bại : ${errorMessage}`}</span> : successMessage ? <span style={{color:"#20B2AA"}}>{`Đăng ký lớp thành công : ${successMessage}`}</span> : ''}
    </form>
    </div>
    <hr></hr>
    {
    classRegistered.length!==0 ? (
    <>
    <br></br>
    <br></br>
   
   <h1 style={{textAlign:"center"}}>Danh sách các lớp đã đăng ký thành công</h1>
   
    <div  className='class-registered'>
    
  
        <table className="registered-classes">
        <tr>
    <th><h3>Mã lớp</h3></th>
    <th><h3>Tên môn học</h3></th>
    <th><h3>Giảng viên phụ trách</h3></th>
    <th><h3>Mã giảng viên</h3></th>
    <th><h3>Số tín chỉ</h3></th>
  </tr>
    {
        classRegistered.map(classData=>(
        <tr>
            <td> <h4><a href={`/classInfo/${classData._id}`}>{classData.class_id}</a> </h4></td>
            <td><h4>{classData.course_name}</h4></td>
            <td><h4>{classData.lecturer.map(lec=>lec.full_name).join(' , ')}</h4></td>
            <td>{classData.lecturer.map(lec=>(<h4><a href='/lecturerInfo/*'>{lec.uid}</a></h4>))}</td>
            <td><h4>{classData.credits}</h4></td>
        </tr>
    ))
    }
    </table>


    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div style={{backgroundColor:"#F5F5F5"}}>
    <hr></hr>
    <div style={{marginTop:"70px"}}>
    
    <br></br>
   
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
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    
    <hr></hr>
    </div>
    </>
    ):''
    }
    <div>
        <SearchClass groupList={groupList} ref={ref}/>
    </div>
    </>
    
    
    )
}

export default RegisterClass;