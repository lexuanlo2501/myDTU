import {useState} from 'react';
import {axios} from 'axios';
import { BsCheckCircle} from "react-icons/bs";



function RegisterForm({getClassRegistered}){
    const  
        [signupCode,setSignUpCode] = useState(null),
        [errorMessage,setErrorMessage] = useState(null),
        [successMessage,setSuccessMessage] = useState(null);


    return (
        <div className='container'>
        <form style={{height:"auto"}}>
        <h2 style={{textAlign:"center"}}>Bảng đăng ký môn học</h2>
        <input  type="text" placeholder="Nhập mã đăng ký lớp học" onChange={(e)=>{
        setSignUpCode(e.target.value); 
        setErrorMessage(null); 
        setSuccessMessage(null);
        }}></input>
        <a style={{margin:"20px",color:"#6495ED",textAlign:"right"}} href=" " onClick = {(e)=>{
            e.preventDefault(); 
            const element = document.querySelector('#search-form');
            if(element){
            element.scrollIntoView({behavior: 'smooth'});
            }
            }
        } alt="">Hoặc tìm kiếm môn học</a>
       
        <button style={{margin:"30px auto"}}  disabled={!signupCode} onClick={(e)=>{
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
    )
}

export default RegisterForm;