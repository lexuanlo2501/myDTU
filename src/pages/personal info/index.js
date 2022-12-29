import Header from "../../components/Layout/components/Header"
import RenderStudentInfo from '../../components/personal info/index'


function PersonalInfo({setUser,}){
    return (
        <div style={{backgroundColor:"#F5F5F5", height:"100vh"}}>
            <Header setUser={setUser}/>
            <RenderStudentInfo/>
        </div>
    )
}

export default PersonalInfo;