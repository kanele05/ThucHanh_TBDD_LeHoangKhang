/**
 * Demo lớp School (Bài 30). Chạy `npm run dev`, mở Console (F12).
 */
import { School } from './School'
import { Student } from './Student'
import { Teacher } from './Teacher'

console.log('===== BÀI 30: TRƯỜNG HỌC =====')

const school = new School('Trường Đại học ABC')

school.addTeacher(new Teacher('Trần Thị B', 40, 'Lập trình hướng đối tượng'))
school.addTeacher(new Teacher('Phạm Văn C', 35, 'Cơ sở dữ liệu'))
school.addStudent(new Student('Lê Hoàng Khang', 20, 8.5))
school.addStudent(new Student('Nguyễn Văn A', 21, 6.0))
school.addStudent(new Student('Trần Thị D', 20, 9.2))

school.displayInfo()

console.log('Điểm trung bình toàn trường:', school.getAverageGrade().toFixed(2))

const sv = school.findStudent('lê hoàng khang')
console.log('Tìm sinh viên:', sv ? sv.getInfo() : 'Không tìm thấy')
