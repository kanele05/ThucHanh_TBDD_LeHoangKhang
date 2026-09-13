import { Person } from './Person'
import { Student } from './Student'

// --- Bước 1: Tạo đối tượng Student ----------------------------------------
// Constructor nhận 3 tham số: tên, tuổi, điểm (2 tham số đầu do lớp cha xử lý).
const sv1 = new Student('Lê Hoàng Khang', 20, 8.5)
const sv2 = new Student('Nguyễn Văn A', 21, 6.0)

console.log('===== BÀI 2: THÔNG TIN SINH VIÊN =====')

// --- Bước 2: Gọi phương thức hiển thị tất cả thông tin ---------------------
sv1.displayAllInfo() // Họ tên: Lê Hoàng Khang | Tuổi: 20 | Điểm: 8.5 (Giỏi)
sv2.displayAllInfo() // Họ tên: Nguyễn Văn A | Tuổi: 21 | Điểm: 6 (Trung bình)

// --- Bước 3: Kế thừa - dùng lại phương thức của lớp cha --------------------
// `getName()` và `getAge()` không hề được viết trong Student, nhưng vẫn gọi
// được vì Student KẾ THỪA chúng từ Person.
console.log('Tên (kế thừa từ Person):', sv1.getName())
console.log('Tuổi (kế thừa từ Person):', sv1.getAge())
console.log('Điểm (của riêng Student):', sv1.getGrade())
console.log('Chuỗi thông tin đầy đủ:', sv1.getInfo())

// --- Bước 4: Minh họa tính ĐA HÌNH (polymorphism) -------------------------
// Một mảng kiểu `Person[]` vẫn chứa được đối tượng `Student`, vì Student "là
// một" Person. Khi gọi displayInfo(), JavaScript tự chọn đúng phiên bản của
// từng đối tượng: Person in 2 thông tin, còn Student in đủ 3 thông tin.
const danhSach: Person[] = [
  new Person('Trần Thị B', 19), // đối tượng lớp cha
  new Student('Phạm Văn C', 22, 9.2), // đối tượng lớp con
]

console.log('===== ĐA HÌNH: CÙNG GỌI displayInfo() =====')
danhSach.forEach((nguoi, index) => {
  console.log(`Phần tử thứ ${index + 1}:`)
  nguoi.displayInfo() // cùng một lời gọi -> kết quả khác nhau tùy kiểu đối tượng
})

// --- Bước 5: Kiểm tra quan hệ kế thừa bằng `instanceof` -------------------
// `instanceof` cho biết một đối tượng có thuộc về một lớp nào đó hay không.
console.log('sv1 có phải Student không?', sv1 instanceof Student) // true
console.log('sv1 có phải Person không?', sv1 instanceof Person) // true (vì kế thừa)
