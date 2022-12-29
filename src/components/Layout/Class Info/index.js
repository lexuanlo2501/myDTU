
import './classInfo.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { useLocation,useParams } from 'react-router-dom';



function ClassInfoLayOut(){
    //console.log('classData = ',classData);
    const {id} = useParams();
    const {state} = useLocation();
    
   
    const [classData,setClassData] = useState([]);
    useEffect(()=>{
        console.log(id);
        if(!state) {
        axios.get(`http://localhost:5000/student/getClassById/${id}`)
        .then(response=>setClassData([response.data]))
        .catch(error=>console.log(error));
        }
      else setClassData([state.data]);
   
    },[]);

    console.log(classData);
    return (
        <div className='class-info-div'>
        <div className="class-info-container">
        {
            classData.map(data=>(
            <>
            <h1 style={{textAlign:"center" , color:"#B22222"}}>Thông tin lớp {data.class_id}</h1>
            <h2 style={{textAlign:"center"}}>{data.semester} : {data.year}</h2>
            <h3  style={{textAlign:"center",color:"#2F4F4F"}}>Mã đăng ký : {data.signUpCode}</h3>
            <br></br>
            <hr></hr>
            <br></br>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
            <h3 style={{color:"#4682B4"}}>Tên môn học : </h3> 
            <h3 style={{color:"#2F4F4F"}}> {data.course_name}</h3>
            </div>
            
            
           <div style={{textAlign:"right"}}>
            <h3 style={{color:"#4682B4"}}>Giảng viên phụ trách:</h3> 
            <h3 style={{color:"#2F4F4F"}}>{
                data.lecturer.length>1?
                data.lecturer.map(lec=>(<><a href='/*'>{lec.full_name}</a> , </>)):
                data.lecturer.map(lec=>(<a href='/*'>{lec.full_name}</a> ))}
            </h3>
            </div>
           
            </div>
            <br></br>
            <h3 style={{color:"#800000"}}>Tuần học (Bắt đầu - Kết thúc) : {data.from_to.starting_week} - {data.from_to.ending_week}</h3>
            <h3 style={{color:"#008080"}}>Ngày bắt đầu - kết thúc : {data.from_to.starting_date} - {data.from_to.ending_date}</h3>
            <br></br>
           
            <h3 style={{color:"#008080"}}>
                Thời gian đăng ký :
            </h3>
            <h3 style={{color:"#2F4F4F"}}>
                Từ ngày {new Date(data.signUpTime.start).toLocaleDateString("en-AU")}  đến ngày {new Date(data.signUpTime.end).toLocaleDateString("en-AU")}
            </h3>
            <br></br>
            <h3 style={{color:"#2F4F4F",display:"flex"}}>
                Trạng thái đăng ký : {data.available?<span style={{marginLeft:"5px", color:"#008080"}}>Có thể đăng ký</span>:<span style={{marginLeft:"5px", color:"#B22222"}}>Không thể đăng ký</span>}
            </h3>
            
            <h3 style={{color:"#2F4F4F"}}>
                Trạng thái lớp học : {data.class_status}
            </h3>
            <br></br>
            <h3 >
                Số chỗ tối đa : {data.avaible_seats}
            </h3>
            <h3 >
                Số chỗ đã đăng ký : {data.occupied_seats}
            </h3>
            <h3 >
                Số chỗ còn lại : {data.remaining_seats}
            </h3>
            <br></br>
            <h3 style={{color:"#2F4F4F"}}>
                Môn học tiên quyết : {data.prerequisite_course.length!==0 ? data.prerequisite_course.join(' , '):'Không có môn học tiên quyết'}
            </h3>
            <h3 style={{color:"#2F4F4F"}}>
                Môn học song hành : {data.parallel_subjects.length!==0 ? data.parallel_subjects.join(' , '):'Không có môn học song hành'}
            </h3>
            <br></br>
          
            <br></br>
            <h3 style={{textAlign:"center"}}>Lịch học cụ thể  theo từng tuần:</h3>
            <p style={{textAlign:"center", color:"red"}}>( Lưu ý ! Đây chỉ là lịch học dự kiến , lịch học thực tế có thể bị thay đổi để phù hợp với điều kiện giảng dạy )</p>
            <br></br>
            <table id="detailed-schedule">
                <tr>
                    <th><h3>Tuần học</h3></th>
                    <th><h3>Ngày học</h3></th>
                    <th><h3>Thời gian</h3></th>
                    <th><h3>Địa điểm</h3></th>
                </tr>
                {
                    data.detailed_Schedule.map((weekData)=>{
                    const schedule = weekData.schedule.slice(1,);
                    return (
                    <>
                    {weekData.schedule[0]?
                    <tr>
                        <td style={{color:"#B22222"}} rowSpan={weekData.schedule.length===0?1:weekData.schedule.length}><h4>Tuần {weekData.week}</h4></td>
                        <td><h4>{weekData.schedule[0]?.week_day || ''} : {weekData.schedule[0]?.date || ''}</h4></td>
                        <td><h4>{weekData.schedule[0]?.time || ''}</h4></td>
                        <td><h4>{weekData.schedule[0]?.place || ''}</h4></td>
                    </tr>:
                    <tr>
                    <td style={{color:"#B22222"}} rowSpan={weekData.schedule.length===0?1:weekData.schedule.length}><h4>Tuần {weekData.week}</h4></td>
                    <td  style={{color:"red"}} colSpan = {3}><h4>Không có lịch học</h4></td>
                    </tr>
                    }
                    {
                        schedule.map(value=>value?(
                            <tr>
                            <td><h4>{value?.week_day || ''} : {value?.date || ''}</h4></td>
                            <td><h4>{value?.time || ''}</h4></td>
                            <td><h4>{value?.place || ''}</h4></td> 
                            </tr>
                        ):
                        (
                            <tr>
                            <td style={{color:"red"}} colSpan = {3}><h4>Không có lịch học</h4></td>
                            </tr>
                        )
                        )
                    }
                    </>
                )})
                }
            </table>
            </>
            ))
        }
        <br></br>
       
        
        </div>
        </div>
    )
}

export default ClassInfoLayOut;