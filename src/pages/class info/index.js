import Header from "../../components/Layout/components/Header";
import ClassInfoLayOut from "../../components/Layout/Class Info/index";


function ClassInfo({setUser,avt_src}){
    return(
        <div style={{height:"100%",backgroundColor:"#F8F8FF"}}>
            <Header avt_src={avt_src} setUser={setUser}/>
            <ClassInfoLayOut />
        </div>
    )
}

export default ClassInfo;