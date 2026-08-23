/**
 * Demo lớp Library (Bài 15). Chạy `npm run dev`, mở Console (F12).
 */
import { Book } from './Book'
import { Library } from './Library'
import { User } from './User'

const lib = new Library('Thư viện Khoa CNTT')

console.log('===== BÀI 15: THƯ VIỆN =====')

// Thêm sách và người dùng vào thư viện.
lib.addBook(new Book('Clean Code', 'Robert C. Martin', 2008))
lib.addBook(new Book('Số Đỏ', 'Vũ Trọng Phụng', 1936))
lib.addUser(new User('Lê Hoàng Khang'))

lib.showInfo()

// Tìm sách theo tên - trả về undefined nếu không có.
const found = lib.findBook('clean code')
console.log('Kết quả tìm kiếm:', found ? found.getInfo() : 'Không tìm thấy')
console.log('Tổng số sách:', lib.getBooks().length)
