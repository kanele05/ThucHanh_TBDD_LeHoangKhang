
// Nhập (import) lớp Person từ file Person.ts để có thể sử dụng ở đây.
import { Person } from './Person'

// --- Bước 1: Tạo các đối tượng (object) từ lớp Person ---------------------
// Từ khóa `new` sẽ gọi constructor và tạo ra một đối tượng mới trong bộ nhớ.
const person1 = new Person('Lê Hoàng Khang', 20)
const person2 = new Person('Nguyễn Văn A', 25)

// --- Bước 2: Gọi phương thức hiển thị thông tin ----------------------------
console.log('===== THÔNG TIN CÁC ĐỐI TƯỢNG PERSON =====')
person1.displayInfo() // In: Họ tên: Lê Hoàng Khang | Tuổi: 20
person2.displayInfo() // In: Họ tên: Nguyễn Văn A | Tuổi: 25

// --- Bước 3: Ví dụ dùng getter và getInfo() -------------------------------
// Mỗi đối tượng giữ dữ liệu riêng của mình, không ảnh hưởng lẫn nhau.
console.log('Tên của person1 là:', person1.getName())
console.log('Tuổi của person2 là:', person2.getAge())
console.log('Chuỗi thông tin person1:', person1.getInfo())

// --- Bước 4: Ví dụ với một mảng nhiều đối tượng Person --------------------
// Duyệt mảng và gọi displayInfo() cho từng phần tử.
const danhSach: Person[] = [
  new Person('Trần Thị B', 19),
  new Person('Phạm Văn C', 22),
]

console.log('===== DANH SÁCH NHIỀU NGƯỜI =====')
danhSach.forEach((p, index) => {
  // In kèm số thứ tự (index bắt đầu từ 0 nên cộng thêm 1 cho dễ đọc).
  console.log(`Người thứ ${index + 1}:`)
  p.displayInfo()
})
