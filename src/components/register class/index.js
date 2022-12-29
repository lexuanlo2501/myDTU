import './index.css';
import axios from 'axios';
import {useEffect,useState} from 'react';
import SearchClass from './searchClass';
import RegisterForm from './registerClass';
import  RegisteredClassList from './classRegistered'


function RegisterClass(){
    const 
            [classRegistered,setClassRegistered] = useState([]),
            [groupList,setGroupList] = useState([]);


    function getClassRegistered(){
        axios.get('http://localhost:5000/student/getRegisteredClasses')
            .then(res=>{
                console.log(res.data);
                setClassRegistered(res.data);
            })
            .catch(e=>console.log(e));
    }

    function getCourseGroup(){
        axios.get('http://localhost:5000/student/getAllCourseGroup')
        .then(response=>{

            setGroupList(response.data)
        })
        .catch(error=>console.log(error));
    }


    useEffect(() => {
        getClassRegistered();
        getCourseGroup();
       
    }, []);
    return (
    <>
   <RegisterForm getClassRegistered={getClassRegistered}/>
    <hr></hr>
    {
    classRegistered.length!==0 ? (
    <RegisteredClassList classRegistered={classRegistered} getClassRegistered={getClassRegistered}/>  
    ):''
    }
    <div>
        <SearchClass groupList={groupList}/>
    </div>
    </>
    
    
    )
}

export default RegisterClass;