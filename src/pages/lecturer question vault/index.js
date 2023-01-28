import { useState,useEffect} from "react";
import axios from "axios";
import { AiFillFileAdd,AiOutlineDelete} from "react-icons/ai";
import {FiEdit3} from "react-icons/fi";
import {MdOutlineCreateNewFolder} from "react-icons/md";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardContent,Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './index.css';

//explain this function , what does it do 

function QuestionVaultLayout(){
    const [vaults,setVaults] = useState([]);
    const [open, setOpen] = useState(false);
    const [vaultName,setVaultName] = useState('');
    const [success,setSuccess] = useState();
    const [errorMsg,setErrorMsg] = useState();
    const [pending,setPending] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 0,
      };

    function fetchData(){
      axios.get('http://localhost:5000/lecturer/getSumittedQuestionVault')
      .then(response=>setVaults(response.data))
      .catch(error=>console.log(error));
    }
    useEffect(()=>{
      fetchData();
    },[]);
    return (
    <>
        {console.log(vaults)}
        <br></br>
        <h2 style={{textAlign:"center"}}>Các bộ câu hỏi đã được nhập :</h2>
        
          <div style={{padding:"55px"}}>
          {vaults.map(data=>(
          <Card>
          <div  style={{display:"flex",justifyContent:"space-between",padding:"5px",backgroundColor:"#F5F5F5",boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}}>
          <CardContent style={{width:"80%"}}>
            <Typography variant="h5" style={{fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>
              Tên bộ câu hỏi : {data.vault_name}
            </Typography>
            <Typography variant="h6" style={{color:"gray",textDecoration:"underline"}}>
              Môn học : {data.course_name||'N/A'}
            </Typography>
            
            
          </CardContent>

          <CardContent style={{display:"flex", justifyContent:"space-evenly",width:"20%"}}>
            <Link to={`/questions-vault/${data._id}`} state={{...data}}><FiEdit3 style={{fontSize:"20px",color:"#696969"}}/></Link>
            <AiOutlineDelete style={{fontSize:"20px",color:"black"}}/>
          </CardContent>

          </div>
          <br></br>
          <CardContent style={{padding:"10px 25px",}}>
            <Typography variant="h6">
              <p style={{fontWeight:"bold", textDecoration:"underline"}}>Thông tin số lượng câu hỏi :</p>
              <ul>
                <li>Câu hỏi trả lời ngắn : {data.questions.shortAnswers.length}</li>
                <li>Câu hỏi tự luận : {data.questions.written_exams.length}</li>
                <li>Trắc nghiệm nhiều lựa chọn : {data.questions.multiple_choices.length}</li>
                <li>Trắc nghiệm đúng / sai : {data.questions.yes_no_questions.length}</li>
              </ul>
            </Typography>
          </CardContent>
          <br></br>
          </Card>
        ))}
          </div>
          
        <div style={{display:"flex",alignItem:"center"}}>

        <button 
        style={{width:"20%",backgroundColor:"#FFFFFF",boxShadow:" rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset", color:"black",height:"auto",padding:"5px"}} 
        onClick={handleOpen}>
        <MdOutlineCreateNewFolder 
        style={{color:"#F4A460", fontSize:"30px", margin:"auto 5px", display:"inline",verticalAlign:"center"}}
          
        />Tạo mới</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{width:"100%",height:"auto"}}>
            <h2 style={{textAlign:"center"}}>Thêm mới ngân hàng câu hỏi cá nhân</h2>
            <div style={{display:"flex",padding:"auto 30px"}}>
            <input onChange={e=>setVaultName(e.target.value)} style={{display:"inline-block", width:"50%",margin:"auto"}} type="text" placeholder="Nhập tên bộ câu hỏi"></input>
            <button 
            style={{display:"inline-block", width:"30%",margin:"auto",backgroundColor:"#4682B4",padding:"5px"}}
            onClick={e=>{
                e.preventDefault();
                const data = {vault_name:vaultName,course_name:""}
                console.log(data);
                setPending(prev=>!prev);
                axios.post('http://localhost:5000/lecturer/createQuestionVault',data)
                .then(()=>{
                  setPending(prev=>!prev);
                  setSuccess('Đã thêm bộ câu hỏi thành công');
                  fetchData();
                  })
                  .catch(error=>{
                  setPending(prev=>!prev);
                  setErrorMsg(error.response.data.errorMessage);
                  })
            }}
            ><AiFillFileAdd style={{margin:"auto"}}/> Thêm mới</button>
            </div>
            <br></br>
            <Box sx={{ display: 'flex' ,width:"100%",padding:"auto 30px",alignItem:"center"}}>
            {pending?<CircularProgress style={{margin:"10px auto"}} />:errorMsg?<p style={{color:"red",textAlign:"center"}}>{errorMsg}</p>:<p style={{textAlign:"center"}}>{success}</p>}
            </Box>
          </form>
        </Box>
      </Modal>
        </div>
    </>
    )
}

export default QuestionVaultLayout;