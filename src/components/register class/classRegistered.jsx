import DeleteClassForm from "./deleteClassForm"

function RegisteredClassList({classRegistered,getClassRegistered}){
    return (
    <>
    <br></br>
    <br></br>
    <h1 style={{textAlign:"center"}}>Danh sách các lớp đã đăng ký thành công</h1>
    <div  className='class-registered'>
    <table className="registered-classes">
    <tr>
    <th><h3>Mã lớp</h3></th>
    <th><h3>Tên môn học</h3></th>
    <th><h3>Giảng viên phụ trách</h3></th>
    <th><h3>Mã giảng viên</h3></th>
    <th><h3>Số tín chỉ</h3></th>
    </tr>
    {
        classRegistered.map(classData=>(
        <tr>
            <td> <h4><a href={`/classInfo/${classData._id}`}>{classData.class_id}</a> </h4></td>
            <td><h4>{classData.course_name}</h4></td>
            <td><h4>{classData.lecturer.map(lec=>lec.full_name).join(' , ')}</h4></td>
            <td>{classData.lecturer.map(lec=>(<h4><a href='/lecturerInfo/*'>{lec.uid}</a></h4>))}</td>
            <td><h4>{classData.credits}</h4></td>
        </tr>
    ))
    }
    <tr  >
        <td className="hidden-column"></td>
        <td className="hidden-column"></td>
        <td className="hidden-column"></td>
        <td className="hidden-column"></td>
        <td><h4 style={{}}>Tổng số tín chỉ : {classRegistered.map(classData=>classData.credits).reduce((prev,next)=>prev+next,0)}</h4></td>
    
    </tr>
    </table>


    </div>
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <div style={{backgroundColor:"#F5F5F5"}}>
    <hr></hr>
    <div style={{marginTop:"70px"}}>
    <br></br>
    <DeleteClassForm classRegistered={classRegistered} getClassRegistered={getClassRegistered}/>
    </div>
    <br></br><br></br><br></br><br></br>
    <hr></hr>
    </div>
    </>)
}

export default RegisteredClassList;