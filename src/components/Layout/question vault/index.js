import { useParams } from "react-router-dom";
import Header from "../components/Header";
import DefaultLayout from "../DefaultLayout";
import {useState,useEffect,useRef} from 'react';
import Box from '@mui/material/Box';
import { Card } from "@mui/material";
import Modal from '@mui/material/Modal';
import ReactQuill, { Quill } from 'react-quill';
import {AiOutlineFileAdd} from 'react-icons/ai';
import 'react-quill/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';
import Collapsible from 'react-collapsible';
import {IoCreateOutline} from 'react-icons/io5';



function Question_Vault({setUser}){
  Quill.register('modules/blotFormatter', BlotFormatter);
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [question,setQuestion] = useState({});
    const [value, setValue] = useState("");
    const [questionType,setQuestionType] = useState();
    const [disable,setDisable] = useState(true);
    const [answers,setAnswers] = useState(
      {
        answers:{
        '1':"",
        '2':"",
        '3':"",
        '4':"",
        },
        correct:''
      }
    );
    const [yes_no_Answers,setYesNoAnswer] = useState({values:['true','false'],correct:''});
    
    const Options = {
      '1':'A',
      '2':'B',
      '3':'C',
      '4':'D'
    };

    const questionContent = useRef({
      _id:id,
      vault_name:'',
      questions:{
        multiple_choices:[],
        yes_no_questions:[],
        shortAnswers:[],
        written_exams:[]
      }
    });
   
    const handleOpen = ()=>setOpen(true);
    const handleClose = ()=>{
      setOpen(false)
      setValue();
      setQuestionType();
      setYesNoAnswer({values:['true','false'],correct:''});
      setAnswers({
        answers:{
        '1':"",
        '2':"",
        '3':"",
        '4':"",
        },
        correct:''
      });
    };
    function handleQuestionChange(content, delta, source, editor) {
      setValue(content);
      console.log(editor.getText())
      setQuestion({question:content});
    }

    function handleAnswerChange(content,delta,source,editor){
      console.log(answers);
      const value = this.className;
      setAnswers(prev=>{
        const modify = {...prev};
        modify.answers[value] = content;
        return {...prev,...modify}
      })
    }

    function addQuestion(){
      console.log('working...');
      switch(questionType ){
        case ('1'):
          questionContent.current.questions.yes_no_questions.push({...yes_no_Answers,...question});
          console.log(questionContent.current);
        break;
        
        case ('2'):
          questionContent.current.questions.multiple_choices.push({...answers,...question});
          console.log(questionContent.current);
        break;
        
        case ('3'):
          questionContent.current.questions.shortAnswers.push({...question});
        break;
        
        default:
          questionContent.current.questions.written_exams.push({...question});

        break;

      }
    }

  const answerModules = {
     //imageResize: {
      //  displaySize: true // default false
      //},
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['image'],
        ['clean']
      ],
     
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      blotFormatter: {}
  }
    const modules = {
      //imageResize: {
      //  displaySize: true // default false
      //},
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
         ['link', 'image', 'video'],
        [{ 'direction': 'rtl' }],  
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['clean']
      ],
     
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      blotFormatter: {}
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: '#F5F5F5',
        border: 'none',
        boxShadow: 24,
        p: 5,
        height:"100vh",
        overflowY: "scroll"
        
      };
    return (
      <>
      {console.log(questionContent.current)}
      {console.log(question)}
      <Header setUser={setUser}/>
        <DefaultLayout>
        <div style={{padding:"20px"}}>
        <br></br>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <button 
        style={{backgroundColor:"white",width:"20%",boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",border:"1px solid #D3D3D3", color:"black", height:"50px", display:"flex", justifyContent:"center"}}
        onClick={handleOpen}
        ><div style={{margin:"auto"}}>Thêm câu hỏi </div><IoCreateOutline style={{fontSize:"20px",margin: "auto auto 10px auto "}}/> </button>
        
        </div>
        <br></br>
        <h2>Câu hỏi đa lựa chọn : </h2>
        
          <div style={{margin:"10px"}}>
          {
            questionContent.current.questions.multiple_choices.map(data=>(
              <Card style={{padding:"25px", margin:"20px auto"}}>
                <div style={{borderRadius:"5px",padding:"auto",width:"100%"}}>
                <div style={{display:"flex",justifyContent:"center",height:"35px",backgroundColor:"#F5F5F5",width:"20%",margin:"auto, 10px", padding:"10px auto", borderRadius:"8px"}}>

                <h3 style={{fontWeight:"initial",textAlign:"center", margin:"auto",fontFamily:"sans-serif"}}>Nội dung câu hỏi : </h3>
                </div>
                <br></br>
                <div style={{margin:"auto 10px",}} dangerouslySetInnerHTML={{__html:data.question}}/>
                </div>
                
                <br></br>
              
               
                <Collapsible  triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{fontSize:"13px", color:"grey"}}>Mở rộng</span>} >
              

              
                <br></br>
                <div style={{width:"100%"}}>
                <hr style={{color:"#C0C0C0", height:"1px",border:"1px solid #C0C0C0"}}></hr>
                <br></br>
                <Card style={{boxShadow:"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",width:"100%", padding:"20px"}}>
                <div style={{display:"flex"}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                <h3 style={{fontWeight:"bold", margin:"auto"}}>Lựa chọn : </h3>
                </div>
               
                <div style={{margin:"auto 10px",borderRadius:"15px",height:"40px",display:"flex", justifyContent:"center", width:"20%",boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"}}> 
                <h3 style={{margin:" auto"}}>Đáp án đúng : {Options[data.correct]}</h3>
               </div>
                </div>
                
                <br></br>
              <div  style={{display:"flex"}}>
              
               <div style={{height:"40px",width:"20%",padding:"5px",borderRadius:"3px", display:"flex",justifyContent:"center",boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>
               <p style={{margin:"auto 30px",fontFamily:"sans-serif"}}>Đáp án A </p>
               </div>
               <div style={{margin:"auto 20px"}} dangerouslySetInnerHTML={{__html:data.answers['1']}}/>
               </div>

               <br></br>

               <div  style={{display:"flex"}}>
               <div style={{height:"40px",width:"20%",padding:"5px",borderRadius:"3px", display:"flex",justifyContent:"center",boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>

               <p style={{margin:"auto 30px"}}>Đáp án B</p>
               </div>
               <div style={{margin:"auto 20px"}} dangerouslySetInnerHTML={{__html:data.answers['2']}}/>
               </div>

               <br></br>
               
               <div  style={{display:"flex"}}>
               <div style={{height:"40px",width:"20%",padding:"5px",borderRadius:"3px", display:"flex",justifyContent:"center",boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>
               
               <p style={{margin:"auto 30px"}}>Đáp án C</p>
               </div>
               <div style={{margin:"auto 20px"}} dangerouslySetInnerHTML={{__html:data.answers['3']}}/>
               </div>
               
               <br></br>
              
               <div  style={{display:"flex"}}>
               <div style={{height:"40px",width:"20%",padding:"5px",borderRadius:"3px", display:"flex",justifyContent:"center",boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>
               
               <p style={{margin:"auto 30px"}}>Đáp án D</p>
               </div>
               <div style={{margin:"auto 20px"}} dangerouslySetInnerHTML={{__html:data.answers['4']}}/>
               </div>
               <br></br>
               
               </Card>
               <br></br>
              
               </div>
              
                </Collapsible>
                
                </Card>
             
            ))
          }
          </div>
          
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{padding:"15px",height:"100vh",overFlow:"auto"}}
        >
        
        <Box sx={style}>
        <div>
        <h3>Nhập nội dung câu hỏi :</h3>
        <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={handleQuestionChange} 
        modules={modules}
        style={{backgroundColor:"white", height:"auto"}}
        />
        <br></br>
        <h3>
        Cài đặt tùy chọn loại câu hỏi : 
        </h3>
        <br></br>
       <form style={{width:"100%"}}>
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <div>
        <input 
        type='radio' 
        id="yes_no" 
        name="choice" 
        value="1"
        onClick={e=>setQuestionType(e.target.value)}

        />
        <label style={{margin:"auto 10px"}} for="yes_no">Trắc nghiệm đúng / sai</label>
        </div>

        <div>
        <input 
        type='radio' 
        id="multiple-choice" 
        name="choice" 
        value="2" 
        onClick={e=>setQuestionType(e.target.value)}
        />
        <label style={{margin:"auto 10px"}} for="multiple-choice">Trắc nghiệm đa lựa chọn</label>
        </div>
        
        <div>
        <input 
        type='radio' 
        id="short-answers" 
        name="choice"
        value="3" 
        onClick={e=>setQuestionType(e.target.value)}  
        />
        <label style={{margin:"auto 10px"}} for="short-answers">Câu hỏi ngắn</label>
        </div>

        <div>
        <input 
        type='radio'
        id="written-exam" 
        name="choice"
        value="4" 
        onClick={e=>setQuestionType(e.target.value)}
         />
        <label style={{margin:"auto 10px"}} for="multiple-choice">Câu hỏi tự luận</label>
        </div>


        </div>
        <br></br>
        <hr style={{border:"0.5px solid black", height:"1px"}}></hr>
        <br></br>
        <div className="question-configure">
          {
            questionType==='1'?
            <div>
            <h4 style={{textAlign:"center"}}>
              Nhập câu trả lời đúng cho câu hỏi :
            </h4>             
            <br></br>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>

            <div>
            <input type="radio"  name="answer" value = "true" onClick={e=>setYesNoAnswer(prev=>({...prev,correct:e.target.value}))}/>
            <label style={{margin:"auto 10px"}}>Đúng</label>
            </div>

            <div>
            <input type="radio"  name="answer" value = "false" onClick={e=>setYesNoAnswer(prev=>({...prev,correct:e.target.value}))}/>
            <label style={{margin:"auto 10px"}}>Sai</label>
            </div>


            </div>
            <br></br>
            <div style={{display:"flex",justifyContent:"center"}}>

           
            </div>
            
       
            
            </div>:
            questionType==='2'?
            <div>
            <h4 style={{textAlign:"center"}}>
              Nhập 4 câu trả lời và chọn đáp án đúng :
            </h4>             
            <br></br>
            

            <div >
            <div style={{display:"flex"}}>
            <input type="radio"  name="answer" value = "1" onClick={e=>setAnswers(prev=>({...prev,correct:e.target.value}))}/>
            <label style={{margin:"auto 10px"}}>Nhập đáp án A : (click chuột vào ô mở rộng)</label>
            </div>
           <Collapsible   triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{borderRadius:"15px",height:"auto",width:"80px", padding:"10px",display:"flex",justifyContent:"center",boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",fontSize:"14px", color:"grey",margin:"auto 25px",float:"left",textAlign:"left"}} >Mở rộng </span>} >
            <br></br>
            <Box style={{width:"100%",display:"flex",justifyContent:"center", alignItems:"center",padding:"auto"}}>
            <ReactQuill className ="1"
            theme="snow" 
            modules={answerModules}
            onChange={handleAnswerChange}
            style={{backgroundColor:"white",width:"100%",margin:"auto 0 auto 35px"}}
            />
            </Box>
            
            </Collapsible>
           
            </div>
            <br></br>
            

            <div >
            <div style={{display:"flex"}}>
            <input type="radio"  name="answer" value = "2" onClick={e=>setAnswers(prev=>({...prev,correct:e.target.value}))} />
            <label style={{margin:"auto 10px"}}>Nhập đáp án B : (click chuột vào ô mở rộng)</label>
            </div>
            
           
           
            <Collapsible   triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{borderRadius:"15px",height:"auto",width:"80px", padding:"10px",display:"flex",justifyContent:"center",boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",fontSize:"14px", color:"grey",margin:"auto 25px",float:"left",textAlign:"left"}}>Mở rộng</span>} >
            <br></br>
            <Box style={{width:"100%",display:"flex",justifyContent:"center", alignItems:"center",padding:"auto"}}>
            <ReactQuill className ="2"
            theme="snow" 
            modules={answerModules}
            onChange={handleAnswerChange}
            style={{backgroundColor:"white",width:"100%",margin:"auto 0 auto 35px"}}
            />
            </Box>
            
            </Collapsible>
           
            </div>
            <br></br>

            <div >
            <div style={{display:"flex"}}>
            <input type="radio"  name="answer" value = "3" onClick={e=>setAnswers(prev=>({...prev,correct:e.target.value}))} />
            <label style={{margin:"auto 10px"}}>Nhập đáp án C : (click chuột vào ô mở rộng)</label>
            </div>
            
           
           
            <Collapsible   triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{borderRadius:"15px",height:"auto",width:"80px", padding:"10px",display:"flex",justifyContent:"center",boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",fontSize:"14px", color:"grey",margin:"auto 25px",float:"left",textAlign:"left"}}>Mở rộng</span>} >
            <br></br>
            <Box style={{width:"100%",display:"flex",justifyContent:"center", alignItems:"center",padding:"auto"}}>
            <ReactQuill className ="3"
            theme="snow" 
            modules={answerModules}
            onChange={handleAnswerChange}
            style={{backgroundColor:"white",width:"100%",margin:"auto 0 auto 35px"}}
            />
            </Box>
            
            </Collapsible>
           
            </div>
            <br></br>

            <div >
            <div style={{display:"flex"}}>
            <input type="radio"  name="answer" value = "4" onClick={e=>setAnswers(prev=>({...prev,correct:e.target.value}))}/>
            <label style={{margin:"auto 10px"}}>Nhập đáp án D : (click chuột vào ô mở rộng)</label>
            </div>
            

            <Collapsible   triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{borderRadius:"15px",height:"auto",width:"80px", padding:"10px",display:"flex",justifyContent:"center",boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",fontSize:"14px", color:"grey",margin:"auto 25px",float:"left",textAlign:"left"}}>Mở rộng</span>} >
            <br></br>
            <Box style={{width:"100%",display:"flex",justifyContent:"center", alignItems:"center",padding:"auto"}}>
            <ReactQuill className ="4"
            theme="snow" 
            modules={answerModules}
            onChange={handleAnswerChange}
            style={{backgroundColor:"white",width:"100%",margin:"auto 0 auto 35px"}}
            />
            </Box>
            
            </Collapsible>

            </div>
            <br></br>

            <div style={{display:"flex",justifyContent:"center", margin:"30px auto"}}>
            
            </div>
                        
            </div>:
            <></>
          }
          <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
          <button  onClick={e=>{e.preventDefault(); addQuestion()}} style = {{width:"30%", backgroundColor:"#F5F5F5", color:"black",boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"}}>
           <AiOutlineFileAdd/> Tạo câu hỏi
          </button>
          </div>
          
        </div>
       </form>
         </div>
         </Box>
        </Modal>
        </div>
        </DefaultLayout>
       </>
            
            
            
        
    )
}

export default Question_Vault;