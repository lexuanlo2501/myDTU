import RegisterClass from "../../components/register class";
import Header from "../../components/Layout/components/Header";
function ClassRegisterPage({setUser,avt_src}){
    return (
        
        <>
        <Header avt_src={avt_src} setUser={setUser}/>
        <RegisterClass/>
        </>
    )
}

export default ClassRegisterPage;