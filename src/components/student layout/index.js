import { Route , Navigate} from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import ScheduleUser from "../../pages/ScheduleUser";
import ClassRegisterPage from "../../pages/register classes";
import ClassInfo from "../../pages/class info";
import Curriculum from "../../pages/curriculum";


export default function StudentLayout({user,setUser,avt_src,studentAccess}){

    return studentAccess ?(
        <>
        
            <Route
                path='ScheduleUser'
                element={user ? <DefaultLayout avt_src={avt_src}  ><ScheduleUser  /> </DefaultLayout> : <Navigate to="/login"/>}
            />

                
            <Route
                path='registerClass'
                element={ <ClassRegisterPage avt_src={avt_src} setUser={setUser}/>}
            />

            <Route
                path='classInfo/:id'
                element={<ClassInfo avt_src={avt_src} setUser={setUser}/>}
            />
            <Route
                path='curriculum'
                element={<Curriculum avt_src={avt_src} setUser={setUser}/>}
            />
        </>
    ) : <Navigate to='/Home'/>
}
