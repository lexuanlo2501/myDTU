import {useState,useEffect} from 'react'
import axios from 'axios'
import './index.css'

function RenderCurriculum(){
    const [curriculum,setCurriculum] = useState([]);
    useEffect(()=>{
        axios
        .get('http://localhost:5000/student/getCurriculum')
        .then(response=>setCurriculum([response.data]))
        .catch(error=>console.log(error));
    },[]);
    console.log(curriculum);
    //const data = {...curriculum[0]}
    return curriculum.map(data=>(
        <div className='curriculum'>
            <h3 style={{color:"#B22222"}}>Chương trình đào tạo : {data.major}</h3> 
            <h4>Hệ chương trình đào tạo : {data.education_type}</h4>
            <br></br> 
                <table > 
                    <tr style={{backgroundColor:"#B22222",color:"white"}}>
                        <th className="th-td-md">
                        <h4>Mã môn học  </h4>
                        </th>
                        <th style={{border:"1px solid #B22222"}}>
                        <h4>Tên môn học </h4>
                        </th>
                        <th className="th-td-sm1">
                        <h4> Số ĐVHT</h4>
                        </th>
                        <th className="th-td-sm2">
                        <h4>  Đơn vị học tập </h4>
                        </th>
                    </tr>
                    <tr>
                        <td className="subjects-header" colSpan={4}>
                            <h5>ĐẠI CƯƠNG </h5>
                        </td>
                    </tr>
                    {
                        data.general_Subjects.map(value=>(
                            <>
                            <tr>
                            <td  style={{padding:"10px 20px"}} colSpan={4}>
                                <h5 style={{fontWeight:"550"}}>{value.course_type}</h5>
                                <p style={{color:"#800000"}}>{value.description}</p>
                            </td>
                            </tr>
                            {
                                value.subjects.map(element=>(
                                    <tr>
                                        <td style={{textAlign:"center"}}><h5>{element.course_id}</h5></td>
                                        <td style={{padding:"5px 20px"}}><h5>{element.course_name}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>{element.credits}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>Tín chỉ</h5></td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }
                    <tr>
                        <td className="subjects-header" colSpan={4}>
                            <h5>GIÁO DỤC THỂ CHẤT & QUỐC PHÒNG 	</h5>
                            
                        </td>
                    </tr>
                    {
                        data.physical_Subjects.map(value=>(
                            <>
                            <tr>
                            <td  style={{padding:"10px 20px"}} colSpan={4}>
                                <h5 style={{fontWeight:"550"}}>{value.course_type}</h5>
                                <p style={{color:"#800000"}}>{value.description}</p>
                            </td>
                            </tr>
                            {
                                value.subjects.map(element=>(
                                    <tr>
                                        <td style={{textAlign:"center"}}><h5>{element.course_id}</h5></td>
                                        <td style={{padding:"5px 20px"}}><h5>{element.course_name}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>{element.credits}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>Tín chỉ</h5></td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }

                    <tr>
                        <td className="subjects-header" colSpan={4}>
                            <h5>ĐẠI CƯƠNG NGÀNH </h5>
                            
                        </td>
                    </tr>
                    {
                        data.core_Subjects.map(value=>(
                            <>
                            <tr>
                            <td  style={{padding:"10px 20px"}} colSpan={4}>
                                <h5 style={{fontWeight:"550"}}>{value.course_type}</h5>
                                <p style={{color:"#800000"}}>{value.description}</p>
                            </td>
                            </tr>
                            {
                                value.subjects.map(element=>(
                                    <tr>
                                        <td style={{textAlign:"center"}}><h5>{element.course_id}</h5></td>
                                        <td style={{padding:"5px 20px"}}><h5>{element.course_name}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>{element.credits}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>Tín chỉ</h5></td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }

                    <tr>
                        <td className="subjects-header" colSpan={4}>
                            <h5>CHUYÊN NGÀNH</h5>
                            
                        </td>
                    </tr>
                    {
                        data.specialization_Subjects.map(value=>(
                            <>
                            <tr>
                            <td  style={{padding:"10px 20px"}} colSpan={4}>
                                <h5 style={{fontWeight:"550"}}>{value.course_type}</h5>
                                <p style={{color:"#800000"}}>{value.description}</p>
                            </td>
                            </tr>
                            {
                                value.subjects.map(element=>(
                                    <tr>
                                        <td style={{textAlign:"center"}}><h5>{element.course_id}</h5></td>
                                        <td style={{padding:"5px 20px"}}><h5>{element.course_name}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>{element.credits}</h5></td>
                                        <td style={{textAlign:"center"}}><h5>Tín chỉ</h5></td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }

            </table>
            
        </div>
        )
    )
                
}

export default RenderCurriculum;