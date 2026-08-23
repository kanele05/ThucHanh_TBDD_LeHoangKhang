/**
 * Demo lớp Teacher (Bài 27). Chạy `npm run dev`, mở Console (F12).
 */
import { Person } from './Person'
import { Student } from './Student'
import { Teacher } from './Teacher'

console.log('===== BÀI 27: GIÁO VIÊN =====')

const gv = new Teacher('Trần Thị B', 40, 'Lập trình hướng đối tượng')

gv.introduce() // phương thức riêng của Teacher
gv.displayInfo() // đã ghi đè để in thêm môn dạy
console.log('Tên (kế thừa từ Person):', gv.getName())

// Đa hình: Person, Student (bài 2) và Teacher cùng nằm trong một mảng.
const danhSach: Person[] = [
  new Person('Nguyễn Văn A', 30),
  new Student('Lê Hoàng Khang', 20, 8.5),
  gv,
]
danhSach.forEach((p) => p.displayInfo())
