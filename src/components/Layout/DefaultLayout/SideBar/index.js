import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

import { faAnglesLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

function SideBar() {

    const sideBarItem = [
        /*{
            title:'Thông tin Cá nhân',
            children:['thông tin cá nhân', 'mật khẩu', 'tìm kiếm người']
        },
        {
            title:'Dành cho Tân Sinh viên',
            children:['Cơ sở Vật chất &amp; Trang thiết bị','Thư viện & Giáo trình','Phương pháp Học tập, Nghiên cứu Khoa học','Hỗ trợ Sinh viên','Hoạt động Sinh viên','Video về DTU','Cập nhật Hồ sơ Nhập học',]
        },
        {
            title:'Tin tức &amp; Thông báo',
            children:['Tin tức &amp; Sự kiện','Thông báo',]
        },*/
        {
            title:'Lịch',
            children:[{source:'',content:'Lịch cá nhân'},{source:'ScheduleUser',content:'Lịch học'},]
        },
        {
            title:'Học tập',
            children:[{source:'registerClass',content:'Đăng ký Môn học'}]
        },
        /*
        {
            title:'Cố vấn Học tập',
            children:['Giảng viên Cố vấn','Cảnh báo Học tập','Đánh giá Rèn luyện','Khai báo Ngoại trú',]
        },
        {
            title:'Đánh giá &amp; Khảo sát',
            children:['Đánh giá Giảng viên','Khai báo Y tế Sinh viên/Giảng viên','Đăng ký chương trình miễn phí Data',]
        },
        {
            title:'Học phí',
            children:['Hóa đơn Học phí','Lịch sử Thanh toán','Quy định Học phí','Hướng dẫn nộp Học phí qua Ngân hàng',]
        },
        {
            title:'Thư viện',
            children:['Nội quy Thư viện DTU','DTU e-Lib','tailieu.duytan.edu.vn','Thư viện số',]
        },
        {
            title:'Phần mềm',
            children:['Microsoft DreamSpark']
        },
        {
            title:'Sổ tay Sinh viên',
            children:['Định hướng cho Tương lai','Đăng ký Học phần','Chương trình, Môn, Lớp &amp; Kỳ','Thang điểm Đánh giá &amp; Kết quả Học tập','Cách tính điểm Đánh giá Học phần','Phụ lục A: Cấu trúc Mã Môn học','Phụ lục B: Hình thức Lớp học','Phụ lục C: Hệ Chính quy',]
        },
        {
            title:'Đăng Ký Cấp Giấy xác nhận',
            children:['Đăng ký Cấp Giấy xác nhận',]
        },
        {
            title:'Các Vấn đề Cơ sở Vật chất',
            children:['Báo cáo Sự cố Phòng học',]
        },
        {
            title:'Quy định Sử dụng myDuyTan',
            children:['Đối với Sinh viên/Học viên',]
        },
        {
            title:'Hướng dẫn Sử dụng MyDTU',
            children:['Tài Liệu Hướng Dẫn myDTU','Video Clip Hướng Dẫn myDTU']
        },
        */
    ]


    return ( 
        <aside className={cx('wrapper')}>
            <h2 className={cx('header-nav')}>Sidebar</h2>
            {/* <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header><span className={cx('accordion-header-cs')}>Thông tin cá nhân</span></Accordion.Header>
                    <Accordion.Body className={cx('accordion-body-cs')}>
                        <ul>
                            <li>
                                <a href=""> <FontAwesomeIcon className='me-2' icon={faChevronRight}/>Thông tin Cá nhân</a>
                            </li>
                            <li>
                                <a href="">Mật khẩu</a>
                            </li>
                            <li>
                                <a href="">Tìm kiếm Người</a>
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><span className={cx('accordion-header-cs')}>Dành cho tân sinh viên</span></Accordion.Header>
                    <Accordion.Body className={cx('accordion-body-cs')}>
                    <ul>
                        <li>
                            <a href="">1</a>
                        </li>
                        <li>
                            <a href="">2</a>
                        </li>
                        <li>
                            <a href="">3</a>
                        </li>
                        <li>
                            <a href="">4</a>
                        </li>
                        <li>
                            <a href="">5</a>
                        </li>
                    </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><span className={cx('accordion-header-cs')}>Tin tức &amp; Thông báo</span></Accordion.Header>
                    <Accordion.Body className={cx('accordion-body-cs')}>
                        Lorem ipsum dolor sit amet
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><span className={cx('accordion-header-cs')}>Lịch</span></Accordion.Header>
                    <Accordion.Body className={cx('accordion-body-cs')}>
                        Lorem ipsum dolor sit amet
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header><span className={cx('accordion-header-cs')}>Học tập</span></Accordion.Header>
                    <Accordion.Body className={cx('accordion-body-cs')}>
                        Lorem ipsum dolor sit amet
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> */}

            <Accordion >
            {sideBarItem.map((item, index)=> {
                return (
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header><span className={cx('accordion-header-cs')}>{item.title}</span></Accordion.Header>
                        <Accordion.Body className={cx('accordion-body-cs')}>
                            <ul>
                                {item.children.map((item2, index2) => 
                                    <li key={index2}>
                                        <a href={`/${item2.source}`}> <FontAwesomeIcon className='me-3' icon={faChevronRight}/>{item2.content}</a>
                                    </li>
                                )}
                            </ul>
                            
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
            </Accordion >


        </aside> 
    );
}

export default SideBar;