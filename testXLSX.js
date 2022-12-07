const XLSX = require('xlsx')
const fs = require('fs');

/*const students = [
    {
        uid:26211942670,
        full_name:"Nguyễn Thanh Hưng",
        email:"nguyenthanhhungso@gmail.com",
        date_of_birth:"23/12/2000"
    },
    {
        uid:28207209681,
        full_name:"Bùi Thị Ngọc Hân",
        email:"bundaumamtom1409@gmail.com",
        date_of_birth:"14/09/2000"
    },
    {
        uid:26211934610,
        full_name:"Nguyễn Tấn Tài",
        email:"ngtantai5902@gmail.com",
        date_of_birth:"05/09/2002"
    }
];

const scoreTypes = [
    {
        description:"Điểm danh hằng ngày",
        percentage:20,
        score_scaling:10
    },
    {
        description:"Chuyền cao tay",
        percentage:25,
        score_scaling:10
    },
    {
        description:"Đập bóng",
        percentage:55,
        score_scaling:10
    },
]
let scores = scoreTypes.map(data=>({[Object.values([data.description]).toString()]:undefined}));
scores = scores.reduce((prev,next)=>({...prev,...next}),{});

//console.log(scores)

const studentsToExcel = students.map(value=>{
    const {uid,full_name,email,date_of_birth} = value;
    return {
        "Mã sinh viên":uid,
        "Họ và tên":full_name,
        "Địa chỉ email":email,
        "Ngày tháng năm sinh":date_of_birth,
        ...scores
        

    }
});
//console.log(studentsToExcel);


const worksheet = XLSX.utils.json_to_sheet(studentsToExcel);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sinh viên");
//
const dir = "../../uploads data/ES 273 AO - BÓNG CHUYỀN CAO CẤP HK1 2022-2023";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
console.log('dir created')
XLSX.writeFile(workbook, `${dir}/Danh sách sinh viên ES 273 AO.xlsx`, { compression: true });
*/
const file = XLSX.readFile('./uploads/Năm Học 2022-2023/Học Kỳ I/DSSV POS 151 A.xlsx');
console.log(XLSX.utils.sheet_to_json(file.Sheets['Sheet1']));