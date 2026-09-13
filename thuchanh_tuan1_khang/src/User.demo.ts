/**
 * Demo lớp User (Bài 7). Chạy `npm run dev` rồi mở Console (F12).
 */
import { User } from './User'

const user = new User('Lê Hoàng Khang')

console.log('===== BÀI 7: GETTER / SETTER =====')
user.showInfo()

// Đọc bằng getter - viết như thuộc tính, không cần dấu ngoặc ().
console.log('Tên hiện tại:', user.name)

// Gán bằng setter - dữ liệu được kiểm tra trước khi lưu.
user.name = '  Nguyễn Văn A  ' // khoảng trắng thừa sẽ bị cắt bỏ
console.log('Sau khi đổi tên:', user.name)

user.name = '' // bị setter chặn lại, tên cũ giữ nguyên
console.log('Sau khi gán chuỗi rỗng:', user.name)

// user._name = 'X'  // ❌ lỗi biên dịch: _name là private, không truy cập từ ngoài
