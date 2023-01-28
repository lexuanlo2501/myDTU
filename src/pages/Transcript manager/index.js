import axios from "axios";
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { BiEditAlt } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import './index.css'

//https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

function ClassTranscript(){
    const {id} = useParams()
    const [transcript,setTranscript] = useState([]);
    const [isApproved,setIsApproved] = useState(false);
    const [editable,setEditable] = useState(false);
    const [status,setStatus] = useState('');
    const [inputFields, setInputFields] = useState([
        { description: '', percentage: 0 ,score_scaling: 10}
    ]);
    const [qualified,setQualified] = useState(false);
    function UpdateQualified (arr){
        const sum = arr.reduce((prev,next)=>{
            return prev + Number(next.percentage);
        },0);
        console.log('sum = ',sum);
        sum === 100 ? setQualified(true):setQualified(false);
    }
    const handleFormChange = (index,event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        UpdateQualified (inputFields);
    }

    const addFields = (e) => {
        let newField = { description: '', percentage: 0 ,score_scaling: 10};
        e.preventDefault();
        setInputFields([...inputFields, newField]);
    }

    const removeFields = (e,index) => {
        let data = [...inputFields];
        e.preventDefault();
        data.splice(index, 1);
        setInputFields(data);
        UpdateQualified (data);

    }
    
    function getTranscript(id){
        axios.get(`http://localhost:5000/lecturer/getClassTranscript/${id}`)
        .then(response=>{
            console.log(response.data);
            setTranscript([response.data]);
            setIsApproved(response.data.status.includes("Approved"));
            setStatus(response.data.status);
        }).catch(error=>console.log(error));
    }

    useEffect(()=>{
        getTranscript(id);
    },[id]);
    return (

        <div style={{margin:"10px auto",padding:"0px 20px"}}>
        {console.log('approved ? : ',isApproved)}
            {
                transcript[0]?transcript.map(data=>
            (
                <>
                <br></br>
                <h3 style={{textAlign:"center",fontWeight:"bold"}}>{data.classData.class.class_id} - {data.classData.class.course_name}</h3>
                <div style={{margin:"auto",display:"flex",justifyContent:"center"}}><p style={{textAlign:"center",textDecoration:"underline"}}>Trạng thái đề cương :{data.status.includes("Approved")?<span style={{marginLeft:"5px",color:"#008080"}}>Đã được phê duyệt</span> : data.status.includes("Reject")?<span style={{marginLeft:"5px",color:"red"}}>Đã bị từ chối</span> : data.status.includes("Pending")?<span style={{marginLeft:"5px",color:"gray"}}>Đang chờ được phê duyệt</span> : <span style={{marginLeft:"5px",color:"gray"}}>{data.status}</span>} </p></div>
                <div style={{display:"flex"}}>
                <p style={{fontWeight:"bold", textDecoration:"underline"}}>Điểm thành phần :</p>
                {status.includes('Pending') || status.includes('Rejected')?<BiEditAlt  style={{margin:" auto 15px", cursor:"pointer",color:"grey",height:"35px", width:"25px"}} onClick={e=>{
                    e.preventDefault();
                    setEditable(true);
                    setIsApproved(false);
                    setInputFields(transcript[0].scoreTypes);
                    UpdateQualified(transcript[0].scoreTypes);
                }}/>: <></>}
                </div>
                <br></br>
                    {
                        isApproved?
                        <div>
                        <p style={{display:"inline-block", margin:"auto 5px",color:"#6495ED"}}>
                        Đã có file danh sách sinh viên , bấm vào nút để tải xuống </p>
                        <button style={{width:"5%",padding:"0", display:"inline-block",backgroundColor:"white",color:"#696969"}} 
                        onClick={e=>{
                        e.preventDefault();
                        console.log(transcript[0].filePath)
                        axios.post(`http://localhost:5000/lecturer/downloadTranscriptFile`,
                        {
                            fileName:transcript[0].fileName,
                            filePath:transcript[0].filePath
                        },
                        {responseType: 'blob'})
                        .then(response=>{
                            console.log(response);
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download',transcript[0].fileName); 
                            document.body.appendChild(link);
                            link.click();
                        }).catch(error=>console.log(error));
                    }}
                    ><BsDownload /></button> </div> :''}
                    <table className="score-types">
                    {
                        isApproved || !editable ?data.scoreTypes.map(score=>(
                            <tr>
                            <td><h4>{score.description} :</h4></td>
                            <td><h4>{score.percentage} %</h4></td>
                            <td><h4>Thang điểm : {score.score_scaling}</h4></td>
                            </tr>  
                    )):''
                    }
                    </table>
                    {
                        (!isApproved && transcript[0].scoreTypes.length===0)|| ( !isApproved && editable)?
                    (
                    <>
                    <h3 style={{textAlign:"center"}}>Bạn chưa nhập đề cương cho lớp này</h3>
                    <br></br>
                    <form style={{width:"100%", alignItems:"center"}}>
                    <div style={{width:"100%" , display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <select style={{width:"80%",border:"3px solid white"}} onChange={e=>{
                            setInputFields(transcript[0].submittedTranscripts[Number(e.target.value)].scoreTypes);
                            setQualified(transcript[0].submittedTranscripts[Number(e.target.value)].scoreTypes.reduce((prev,next)=>{
                                    return prev + Number(next.percentage);
                                    },0) === 100);
                    
                        }}>
                        <option value="" disabled selected>Chọn đề cương đã nhập cho môn : {transcript[0].classData.course_id}</option>
                            {
                                transcript[0].submittedTranscripts.map((value,index)=>(
                                    <option value={index}>
                                        {value.classData.class.class_id} - {value.classData.class.course_name}
                                    </option>
                                ))
                            }
                        </select>
                        </div>
                        <br></br>
                        <p style={{textAlign:"center"}}>Hoặc nhập điểm thành phần ở dưới đây</p>
                        {inputFields.map((input, index) => {
                        return (
                            <>
                            <div className="score-types"  style={{display:"flex",margin:"30px auto",justifyContent:"space-evenly"}} key={index}>
                            <input style={{borderBottom:"1px solid #D3D3D3",width:"35%", margin:" auto 10px "}}
                                name='description'
                                placeholder='Nhập điểm thành phần' 
                                value={input.description}
                                onChange={e => handleFormChange(index, e)}
                            />
                            <input style={{borderBottom:"1px solid #D3D3D3",width:"15%",margin:"auto 25px"}}
                            name='percentage'
                            placeholder='% Điểm'
                            value={input.percentage}
                            onChange={e => handleFormChange(index, e)}
                            type="number"
                            min={0}
                            max={100}
                            maxLength={4}
                            />
                            

                            <button style={{width:"10%",borderRadius:"5px", margin:"auto 0 auto 5px",height:"10%",backgroundColor:"#DC143C"}} onClick={(e)=>removeFields(e,index)}>Xóa</button>
                            </div>
                            </>
                        )
                    })}
                    <div style={{width:"100%" , display:"flex",alignItems:"center"}}>
                    <button style={{width:"28%", margin:" 0 auto",textAlign: "center",alignItems:"center",height:"30px",backgroundColor:"#778899"}} onClick={(e)=>addFields(e)}>Thêm mới điểm</button>
                    </div>
                </form>
                </>
                    ):''
                    }
                    <br></br>
                    <h4>Mô tả bởi giảng viên : </h4>
                    <h4>Phê duyệt từ quản trị viên : </h4>
                    {isApproved?<a style={{color:"#4682B4"}} href={`/lecturer/score-manager/${transcript[0]._id}`} >Nhập điểm của sinh viên tại đây</a>:""}
                    
                    <br></br>
                        <>
                        <div style={{width:"100%", display:"flex", alignItems:"center",justifyContent:"center"}}>
                        {(status.includes('N/A') && !isApproved && transcript[0].scoreTypes.length === 0)? (<button disabled={!qualified} style={{width:"60%"}} onClick={e=>{
                            e.preventDefault();
                            const data = {...transcript[0],scoreTypes:inputFields}
                            console.log('data : ',data);
                            axios.post('http://localhost:5000/lecturer/addTranscript',
                            {
                                ...data
                            })
                            .then(response=>{
                                alert(response.data.message);
                                getTranscript(id);
                                })
                            .catch(error=>console.log(error));
                        }}>
                            Nộp đề cương
                        </button>) : (status.includes('Pending') ||status.includes('Rejected'))  && editable && !isApproved?
                        (<button disabled={!qualified} style={{width:"60%"}} onClick={e=>{
                            e.preventDefault();
                            const data = {...transcript[0],scoreTypes:inputFields}
                            console.log('data : ',data);
                                axios.patch('http://localhost:5000/lecturer/updateTranscript',
                            {
                                ...data
                            })
                            .then(response=>{
                                alert(response.data.message);
                                getTranscript(id);
                                })
                            .catch(error=>console.log(error));
                        }}>
                            Cập nhập đề cương
                        </button>):<></>
                        }
                        
                        </div>
                        <br></br>
                        
                        </>
                        
                    
                </>
                )
               
                ):''
            }
        </div>
    )
}

export default ClassTranscript