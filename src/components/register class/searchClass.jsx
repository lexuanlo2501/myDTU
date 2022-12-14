import {useEffect,useState} from 'react';
import axios from 'axios';
import { BiSearch ,} from "react-icons/bi";
//import searchImg from '../../../public/searchClass.jpg';
function SearchClass({groupList,ref}){
    
    const [courses,setCourses] = useState([]);
    const [courseId,setCourseId] = useState(null);
    const [results,setResults] = useState([]);
    console.log(results);
    return (<>
        <img id="search-form" src='/searchClass.jpg' alt ="search" style={{height:"60vh", width:"60%", display:"block",margin:"20px auto"}}>
            
        </img>
        <div  className='search-container'>
       <form  ref={ref} style={{width:"60%"} }>
    <h1 style={{textAlign:"center"}}>Hãy tìm kiếm lớp tại đây bạn nhé</h1>
        <div style={{display:"flex" , justifyContent:"space-between"}}>
            <label style={{marginTop:"30px"}} for="findClass">Chọn mã chuyên ngành</label>
            <label style={{marginTop:"30px"}} for="findClass">Chọn mã môn học</label>
        </div>
       <div style={{display:"flex" , justifyContent:"space-between"}}>
        <select onChange={(e)=>setCourses(groupList[Number(e.target.value)].courses)}>
        <option value="" disabled selected>Chọn mã chuyên nghành</option>
        {
            groupList.map((group,index)=>(
                <option value={index}>{group.group_id}</option>
            ))
        }
        </select>
        <select onChange={(e)=>setCourseId(e.target.value.trim())}>
        <option value="" disabled selected>Chọn mã môn học</option>
        {
            courses.map(course=>(
                <option value={course.split(" - ")[0].trim()}>{course}</option>
            ))
        }

        </select>
        </div>
        <br></br>
        <div style={{width:"100%" , display:"flex", justifyContent:"center"}}>

        <button className="search-class-btn" disabled={!courseId} style={{width:"50%",backgroundColor:"#1E90FF"}} 
        onClick ={(e)=>{
            e.preventDefault();
            axios.post('http://localhost:5000/student/findClasses',{
                course_id:courseId
            })
            .then(response=>setResults(response.data))
            .catch(error=>console.log(error));
        }}
        ><BiSearch/> Tìm lớp </button>
        </div>
       </form>
    </div>
       <div className='class-results'>
       
      {results.length!==0 ? (
        <>
        <h1 style={{textAlign:"center"}}>Kết quả các lớp tìm thấy theo mã môn {courseId} :</h1>
        <br></br>
        <table  className="class-found" style={{textAlign:"center"}}>
        <tr style={{textAlign:"center"}}>
        <th><h3>Mã lớp</h3></th>
        <th><h3>Tên môn học</h3></th>
        <th><h3>Mã đăng ký</h3></th>
        <th><h3>Giảng viên phụ trách</h3></th>
        <th><h3>Giai đoạn học</h3></th>
        <th><h3>Ngày bắt đầu - kết thúc</h3></th>
        <th><h3>Thời gian và địa điểm</h3></th>
        <th><h3>Số tín chỉ</h3></th>
    </tr>
        {
        results.map(result=>(
            <tr style={{textAlign:"center"}}>
                <td><h4>{result.class_id}</h4></td>
                <td><h4>{result.course_name}</h4></td>
                <td><h4 className='signup-code' style={{cursor:'pointer'}} onClick={(e)=>{ 
                    navigator.clipboard.writeText(e.target.innerText.trim());
                }}>{result.signUpCode}</h4></td>
                <td><h4>{result.lecturer.map(lec=>lec.full_name).join(' , ')}</h4></td>
                <td><h4>{`${result.from_to.starting_week} - ${result.from_to.ending_week}`}</h4></td>
                <td><h4>{`${result.from_to.starting_date} - ${result.from_to.ending_date}`}</h4></td>
                <td style={{textAlign:"left"}}><h4>{result.timeAndplace.map(data=>(
                    <>
                    <br></br>
                    {data.week_day} : {data.time} <br></br>Địa điểm : {data.place}
                    <br></br>
                    </>
        ))}</h4></td>
                <td><h4>{result.credits}</h4></td>
            </tr>
        ))
        }
        </table>
        </>
      ): (<h2 style={{textAlign:"center"}}>Không tìm thấy thông tin lớp theo yêu cầu</h2>)}
       </div>   
    </>)
}

export default SearchClass;