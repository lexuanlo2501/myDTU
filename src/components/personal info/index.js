import axios from "axios";
import { useState,useEffect ,ChangeEvent} from "react";
import { AiOutlineFileImage} from "react-icons/ai";
import { FiUpload} from "react-icons/fi";
import './index.css'


function RenderStudentInfo(){
    const [student,setStudent] = useState([]);
    const [file, setFile] = useState();
    const [avt_src,setSrc] = useState(`http://localhost:5000/${JSON.parse(localStorage.getItem('avt_src'))}`);
    function handleFileUpload(e){
        setFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log('submitting');
        const url = 'http://localhost:5000/uploadProfilePicture';
        const formData = new FormData();
        formData.append('avatar', file);
        //formData.append('fileName', file.name);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            setSrc(`http://localhost:5000/${response.data.avt_src}`);
            localStorage.setItem('avt_src',JSON.stringify(response.data.avt_src));
          }).catch(error=>console.log(error));  
    }


    useEffect(()=>{
        axios.get('http://localhost:5000/student/studentInfo')
        .then(response=> setStudent([response.data]))
        .catch(error=>console.log(error));
    },[]);
    console.log(student);
    console.log('file = ',file);
    return (
        <>
        {
            student.map(data=>
            (
                <div className="personal-info-card">
                <div style={{display:"flex",backgroundColor:"white",padding:"10px"}}>
                <img style={{opacity:file?'30%':'100%'}}  className="profile-picture" src={avt_src ? avt_src:'default.png'} alt="profile"></img>
                <div>
                <p style={{fontWeight:"bold"}}>{data.full_name}</p>
                <p>{data.uid}</p>
                <form onSubmit={handleSubmit}  style={{height:"auto" ,width:"100%",boxShadow:"none",padding:"0",overflow: "hidden",whiteSpace: "nowrap", display:"flex"}}>
                <input type="file" name="avatar" id="img" style={{display:"none"}}  accept="image/*"  onChange={(e)=>handleFileUpload(e)}/>

                <label className="upload-img" style={{fontSize:"14px",color:"#008080"}} for="img">{ !file?"Cập nhập ảnh đại diện":'Nhấn vào nút xanh dưới ảnh đại diện hiện tại để tải ảnh lên hoặc nhấn vào đây để đổi ảnh khác' }<AiOutlineFileImage/></label>
                {file?  <button type="submit" style={{position:"absolute", width:"60px", left:"26.5%"}}><FiUpload ></FiUpload></button>:''}
                </form>
                </div>
                </div>
                <br></br>
                <hr style={{backgroundColor:"black",border:"1px solid black"}}></hr>
                <br></br>
                <h4 style={{textDecoration:"underline",color:"#B22222"}}>Thông tin cơ bản :</h4>
                <br></br>
                <div className="info-container" > 
                <div style={{display:"flex" , justifyContent:"space-between"}}>
                <p>Họ và tên : {data.full_name}</p>
                <p>Giới tính : {data.gender.includes('male')?'Nam':'Nữ'}</p>
                </div>
                <div style={{display:"flex" , justifyContent:"space-between"}}>
                <p>Ngày sinh : {data.date_of_birth}</p>
                <p>Quê quán : {data.PlaceOfBirth}</p>
                </div>
                <p>Địa chỉ email : {data.email}</p>
                </div>
                <br></br>
                <h4 style={{textDecoration:"underline",color:"#696969"}}>Thông tin chi tiết :</h4>
                <br></br>
                <div className="detailed-info-container" > 
                <div style={{display:"flex" , justifyContent:"space-between"}}>
                <p>Mã sinh viên : {data.student_id}</p>
                <p>Niên khóa : {data.academic_year}</p>
                </div>
                <p>Ngày nhập học : {new Date(data.admission_Date).toLocaleDateString("en-AU")}</p>
                <p>Hệ đào tạo : {data.education_type}</p>
                <p>Chuyên ngành đào tạo : {data.study_major}</p>
                <p>Giảng viên cố vấn : </p>
                <p>Lớp sinh hoạt : </p>
                </div>
                <br></br>
                
            </div> 
            ))
        }
        </>
    )
}

export default RenderStudentInfo;