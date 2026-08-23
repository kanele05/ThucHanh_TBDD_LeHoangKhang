/**
 * Demo lớp generic Box (Bài 16). Chạy `npm run dev`, mở Console (F12).
 */
import { Box } from './Box'
import { Book } from './Book'

console.log('===== BÀI 16: GENERIC BOX =====')

// Mỗi Box giữ một kiểu khác nhau nhưng dùng chung một lớp.
const numberBox = new Box<number>(100)
const stringBox = new Box<string>('Xin chào')
const boolBox = new Box(true) // TS tự suy ra T = boolean, không cần ghi rõ

numberBox.showInfo()
stringBox.showInfo()
boolBox.showInfo()

// Giá trị lấy ra giữ nguyên kiểu -> gọi được phương thức của kiểu đó.
console.log('Số + 1 =', numberBox.getValue() + 1)
console.log('Chuỗi viết hoa:', stringBox.getValue().toUpperCase())

// numberBox.setValue('abc')   // ❌ lỗi ts(2345): Box<number> chỉ nhận number

// Box cũng chứa được object hoặc mảng.
const bookBox = new Box(new Book('Clean Code', 'Robert C. Martin', 2008))
console.log('Sách trong hộp:', bookBox.getValue().getInfo())

const listBox = new Box<number[]>([1, 2, 3])
console.log('Tổng mảng trong hộp:', listBox.getValue().reduce((a, b) => a + b, 0))
