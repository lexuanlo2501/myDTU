import './index.css'
import Collapsible from 'react-collapsible';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';


function RenderNotifications(){
    const {state} = useLocation();
    const [notification,setNotification] = useState([]);
    
    useEffect(()=>{
        if(!state){
        axios.get('http://localhost:5000/notifications')
        .then(response=>setNotification([...response.data]))
        .catch(e=>console.log(e));
        }
        else setNotification(state.data);
    },[]);
        console.log('Thông báo : ',notification);
    return (
        <>
        <br></br>
        <br></br>
        {
            notification.map(data=>(
                <div style={{margin:"60px auto",width:"60vw", height:"auto",border:"1px solid #F5F5F5",borderRadius:"10px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <div className='notification-card'>
            <h2 style={{fontWeight:"bold"}}>{data.Type}</h2>
            
            <hr ></hr>
            <br></br>
            <div className='notification-card-header'>
                <img style={{height:"60px", width:"60px",border:"1px solid #F5F5F5",borderRadius:"50%"}} src={data.sender.avt_src?data.sender.avt_src:'default.png'} alt='user-avatar'></img>
                <div className='notification-header-text'> 
                <h2>{data.sender.full_name}</h2>
                <div style={{display:"flex"}}>
                <p style={{fontSize:"15px", textDecoration:"underline"}}>{data.sender.email}</p>
                <p style={{fontSize:"13px", marginLeft:"15px", color:"#A9A9A9"}}>{data.createdAt}</p>
                </div>
            </div>
            </div>
        <Collapsible transitionTime={200} triggerWhenOpen={<span style={{fontSize:"13px", color:"grey"}}>Ẩn bớt</span>} trigger={<span style={{fontSize:"13px", color:"grey"}}>Đọc thêm...</span>}>
        <div style={{padding:"10px 20px "}}>
            <br></br>
            <p>{data.content}</p>                
        </div>
        </Collapsible>
        
                    
        </div>
        </div>
            ))
        }
        <h2 style={{textAlign:"center"}}>Bạn đã đọc hết thông báo</h2>
        </>
    )
}

export default RenderNotifications