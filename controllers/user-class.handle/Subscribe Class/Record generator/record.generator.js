function generateRecord(year,semester,study_record,class_data){
    /**
     * *Hàm này được dùng để tạo thông tin toàn bộ quá trình học của sinh viên bao gồm 
     * *    những lớp đã đăng ký theo từng học kỳ của từng năm
     * @param year : Năm học
     * @param semester : Học kỳ
     * @param study_record : Mảng lưu trữ thông tin thành tích học tập theo từng học kỳ của từng năm
     * @param class_data : Thông tin về lớp học  
     */
    const Record = [...study_record],
        result_data = Record.find(data=>data.year===year),
        semester_I  = [],
        semester_II = [],
        summer_semester = [];
    //*Thêm thông tin lớp vào từng học kỳ theo năm tương ứng
    switch(true){
        case(semester.includes('Học Kỳ I')):
            Record.length!==0 && result_data ? result_data.semester_I.push(class_data) : 
            semester_I.push(class_data);
        break ;

        case(semester.includes('Học Kỳ II')):
            Record.length!==0 && result_data ? result_data.semester_II.push(class_data) : 
            semester_II.push(class_data);
        break ;

        case(semester.includes('Học Kỳ Hè')):
            Record.length!==0 && result_data ?result_data.summer_semester.push(class_data) : 
            summer_semester.push(class_data);
        break ;

    }
    
    return Record.length!==0 && result_data ? [...Record] : 
        [
            ...Record,
        {
            year,semester_I,
            semester_II,summer_semester
        }
        ];
}

module.exports = generateRecord;
