import axios from "axios";
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import './index.css'
function ClassTranscript(){
    const {id} = useParams()
    const [transcript,setTranscript] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/lecturer/getClassTranscript/${id}`)
        .then(response=>{
            console.log(response.data);
            setTranscript([response.data]);
        }).catch(error=>console.log(error));
    },[id]);
    return (
        <div style={{margin:"10px auto",padding:"0px 20px"}}>
            {
                transcript[0]?transcript.map(data=>
            (
                <>
                <br></br>
                <h3 style={{textAlign:"center",fontWeight:"bold"}}>{data.class.class_id} - {data.class.course_name}</h3>
                <div style={{margin:"auto",display:"flex",justifyContent:"center"}}><p style={{textAlign:"center",textDecoration:"underline"}}>Trạng thái đề cương :{data.status.includes("Approved")?<span style={{marginLeft:"5px",color:"#008080"}}>Đã được phê duyệt</span> : data.status.includes("Reject")?<span style={{marginLeft:"5px",color:"red"}}>Đã bị từ chối</span> :<span style={{marginLeft:"5px",color:"gray"}}>Đang chờ được phê duyệt</span> }</p></div>
                <p style={{fontWeight:"bold", textDecoration:"underline"}}>Điểm thành phần :</p>
                <br></br>
                    <table className="score-types">
                    {data.scoreTypes.map(score=>(
                            <tr>
                            <td><h4>{score.description} :</h4></td>
                            <td><h4>{score.percentage} %</h4></td>
                            <td><h4>Thang điểm : {score.score_scaling}</h4></td>
                            </tr>  
                    ))
                    }
                    </table>
                    <br></br>
                    <h4>Mô tả bởi giảng viên : </h4>
                    <h4>Phê duyệt từ quản trị viên : </h4>
                </>
                )):<h2 style={{textAlign:"center"}}>Bạn chưa nhập đề cương cho lớp này</h2>
            }
        </div>
    )
}

export default ClassTranscript