import { read, utils} from 'xlsx';
import { AiOutlineEdit} from "react-icons/ai";
import {useState,useEffect,useRef} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './index.css'

function Tabeller() {
    const [__html, setHTML] = useState("");
    const [editable,setEditable] = useState(false);
    const [scoreBoard,setScoreBoard] = useState([]);
    const {id} = useParams();
    const valid = useRef(false);
    const StudentScoresRecord = useRef([]);
    const modify = useRef([]);
    const original = useRef([]);
    const [studentsScores,setStudentsScores] = useState([]);
    const ChangeScore = (record_index,score_index,e)=>{
      const data = [...studentsScores];
     
      if(
        data[record_index].ScoresRecord[score_index].value!== Number(e.target.innerText) && 
        !isNaN(Number(e.target.innerText)) && 
        (Number(e.target.innerText)>=0 && Number(e.target.innerText)<=10 )){
          console.log(`orginal  at index before : ${record_index}`, original.current[record_index]);
      data[record_index].ScoresRecord[score_index].value = Number(e.target.innerText);
      console.log(`orginal  at index  after : ${record_index}`, original.current[record_index]);
      setScoreBoard(prev=>[{...prev[0],StudentScoresRecord:data}]);
      const prev = modify.current;
      const exist = prev.find(value=>value.uid.includes(data[record_index].uid));
      if(exist) exist.ScoresRecord = data[record_index].ScoresRecord;
      else modify.current = [...prev,data[record_index]];
      }
      else e.target.innerText = data[record_index].ScoresRecord[score_index].value;
      console.log('modified : ',modify.current);
     
    }

  const FilterDifferences = ()=>{
    modify.current = modify.current.filter(data=>{
      const {ScoresRecord = []} = original.current.find(student=>student.uid.includes(data.uid))||{};
      return ScoresRecord.some(
        (score,index)=>
        {
          return !JSON.stringify(score).includes(JSON.stringify(data.ScoresRecord[index]))
        });

    });
    return modify.current;
  }

  function GetData(){
    axios.get(`http://localhost:5000/lecturer/getStudentScore/${id}`)
    .then(response=>{
      setScoreBoard([response.data]);
      setStudentsScores([...response.data.StudentScoresRecord]);
      original.current = JSON.parse(JSON.stringify(response.data.StudentScoresRecord));
    })
    .catch(error=>console.log(error));
  }


    useEffect(() => {
      GetData();    
    }, [id]);
  
    return scoreBoard.map(dataRecord=>
      
      <div style={{padding:"25px"}}>
    <br></br>
    <h2 style={{textAlign:"center",fontFamily:"sans-serif", fontWeight:"bold"}}>Quản lý điểm thành phần sinh viên lớp - {dataRecord.class.class_id}</h2>
    <br></br>
    <div style={{borderRadius:"15px",backgroundColor:"#F5F5F5", padding:"20px",boxShadow:"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;"}}>
   
    <br></br>
    <h3 style={{textDecoration:"underline",fontWeight:"bold",color:"#2F4F4F"}}>Những điểm cần lưu ý :</h3>
    <ul className="rules" style={{padding:"15px"}}>
      <li>Giảng viên không được thay đổi bất kỳ trường nào trong file cung cấp ngoại trừ giá trị điểm thành phần của sinh viên</li>
      <li>Nếu nộp bằng file khác so với file được cung cấp thì file đó phải có format giống như file gốc</li>
      <li>Giảng viên xem kỹ lại các trường điểm thành phần của sinh viên nếu có sai sót thì có thể chọn file khác hoặc sửa lại sau khi nộp (Trước khi phòng đào tạo chốt điểm)</li>
      <li>Nếu có bất kỳ vấn đề gì hãy liên lạc quản trị viên để được hỗ trợ kỹ thuật</li>
    </ul>
    <br></br>
    </div>
    <br></br>
    <h4 style={{textAlign:"center"}}>Thông tin những cột điểm cần có trong file Excel (chỉ lấy điểm thành phần còn lại mang tính chất tham khảo)</h4>
    <br></br>
      <table className="transcript">
        <thead>
          <th>Điểm thành phần</th>
          <th>% Điểm</th>
          <th>Thang điểm</th>
        </thead>
          {dataRecord.scoreTypes.map(score=>
          <tr>
          <td>
          {score.description}
          </td>
          <td>
          {score.percentage}
          </td>
          <td>
          {score.score_scaling}
          </td>
          </tr>
          )}
      </table>
    <br></br>

    <div >
    <hr></hr>
    <br></br>
    <input type="file" id="fileXLSX" style={{display:"none"}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={async(e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        let wb = read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const JSON_Data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
       let log = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
       console.log([...log]);
        const data_score = JSON_Data.map(value=>{
          const scores = Object.keys(value).slice(4,);
          return {
            uid:value['Mã sinh viên'],
            full_name:value['Họ và tên'],
            email:value['Địa chỉ email'],
            date_of_birth:value['Ngày tháng năm sinh'],
            ScoresRecord                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  :scores.map(key=>({
              description:key,
              value:value[key]
            }))
          }
        })
        console.log(data_score);
        StudentScoresRecord.current = data_score;
        valid.current = data_score.some(
          value=>value.uid 
          && value.full_name 
          && value.email 
          && value.date_of_birth 
          && value.ScoresRecord.some(
            data_record=>data_record.value && dataRecord.scoreTypes.some(sc=>sc.description.includes(data_record.description))  ) );
        
        setHTML(utils.sheet_to_html(ws, { id: "tabeller" }));
    }
  }/>
    <label style={{border:"none", borderRadius:"5px" ,color:"white",backgroundColor:"#708090",marginLeft: "auto",marginRight: "0",float:"right"}} for="fileXLSX" class="btn">Chọn file .XLSX hoặc .CSV</label>
    </div>  
      <br></br>
      {__html.length!==0?<h3 style={{display:valid.current ?'none':'block',textAlign:"center",color:"red"}}>File excel bạn nhập không đúng format được cung cấp</h3>:''}
    
      {
        dataRecord.StudentScoresRecord.length ===0 ? <div  dangerouslySetInnerHTML={{ __html }}/> : 
        <div>
        <br></br>
        <h3 style={{textAlign:"center"}}>Bảng điểm đã được nhập cho lớp  {dataRecord.class.class_id}</h3>
        {
          dataRecord.editable?
          <button  
          style={{backgroundColor:"#F5F5F5",color:"black",width:"4%", padding:"1px",float:"right"}}
          onClick={e=>{
            e.preventDefault();
            setEditable(prev=>!prev);
          }}  
          >
            <AiOutlineEdit/>
          </button>:<></>}

        <br></br>
          <table className="submitted-scores">
            <thead>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Địa chỉ email</th>
              <th>Ngày tháng năm sinh</th>
              {
                dataRecord.scoreTypes.map(score=>
                <>
                <th>
                {score.description}
                </th>
                </>
                )
              }
            </thead>
            <tbody>
              {
                dataRecord.StudentScoresRecord.map(
                  (record,record_index)=>
                  <tr>
                    <td>{record.uid}</td>
                    <td>{record.full_name}</td>
                    <td>{record.email}</td>
                    <td>{record.date_of_birth}</td>
                    {record.ScoresRecord.map((score,score_index)=><td contentEditable={editable} onBlur={e=>{ChangeScore(record_index,score_index,e)}}>{score.value}</td>)}
                    {record.ScoresRecord.length !== dataRecord.scoreTypes.length?<td>N/A</td>:<></>}
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }
      <br></br>
      <div style={{display:"flex",alignItem:"center"}}>
      {
        !dataRecord._id?<button style={{display:!valid.current?'none':'block' ,width:"25%",textAlign:"center",margin:"auto",fontFamily:"sans-serif", fontWeight:"lighter" }} onClick={() => {
        console.log({
          _id:id,
          class:dataRecord.class,
          StudentScoresRecord:StudentScoresRecord.current
      });
        axios.post('http://localhost:5000/lecturer/addStudentsScoreRecord',{
          _id:id,
          class:dataRecord.class,
          StudentScoresRecord:StudentScoresRecord.current
        })
        .then(response=>alert(response.data.message))
        .catch(error=>console.log(error));
      }}><b>Nộp điểm</b></button>:
      <button 
      style={{width:"40%",display:editable?"block":"none"}} 
      disabled={modify.current.length===0}
      onClick={e=>{
        e.preventDefault();
        const modifiedScores = FilterDifferences();
        if(modifiedScores.length===0) alert("Không có bất kỳ thay đổi nào của điểm thành phần đề thay đổi !");
        else {
          console.log({
            _id:id,
            class:dataRecord.class,
            modifiedScores
        });
          axios.patch('http://localhost:5000/lecturer/updateStudentScores',
          {
            _id:id,
            class:dataRecord.class,
            modifiedScores
          })
          .then(response=>{
            alert(response.data.message);
            GetData(); 
            })
          .catch(error=>console.log(error));
        }
      }}
      >
        Cập nhập điểm
      </button>
      }
      </div>
      </div>);
  }

export default Tabeller;

