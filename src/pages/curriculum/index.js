import Header from "../../components/Layout/components/Header"
import RenderCurriculum from "../../components/curriculum"
function Curriculum({setUser,avt_src}){
    return (
        <>
        <Header avt_src={avt_src} setUser={setUser}/>
        <RenderCurriculum/>
        </>
    )
}

export default Curriculum