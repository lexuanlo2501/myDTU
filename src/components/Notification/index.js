import Header from "../Layout/components/Header"
import RenderNotifications from "../../pages/Notifications";
function NotificationPage({setUser}){
    return (
        <>
        <Header setUser={setUser} />
        <RenderNotifications/>
        </>
    )
}

export default NotificationPage;