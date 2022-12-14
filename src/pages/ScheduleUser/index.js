import Schedule from "../../components/Schedule";
import styles from "./scheduleUser.module.scss"
import classNames from "classnames/bind";
import { Navigate } from "react-router-dom";
const cx = classNames.bind(styles)

function ScheduleUser() {
  const user = JSON.parse(localStorage.getItem('user') ) || {};
  const {authenticate , accessLevel} = user;
  return ( 
    authenticate &&  accessLevel === 3 ? <div className={cx('wrapper')}>
        <Schedule ></Schedule>
        
    </div> : <Navigate to="/login"/>
    );
}

export default ScheduleUser;