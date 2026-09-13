/**
 * Demo lớp Account (Bài 10). Chạy `npm run dev` rồi mở Console (F12).
 */
import { Account } from './Account'

const acc = new Account('Lê Hoàng Khang', 'VCB-0123456789', 500_000, '1234')

console.log('===== BÀI 10: PUBLIC / PRIVATE / READONLY =====')
acc.showInfo()

// public -> đọc và sửa được từ bên ngoài.
console.log('Chủ TK:', acc.owner)
acc.owner = 'Lê Hoàng Khang (đã đổi tên)'

// readonly -> đọc được nhưng KHÔNG gán được.
console.log('Số TK (readonly):', acc.accountNumber)
// acc.accountNumber = 'ABC'   // ❌ lỗi ts(2540): Cannot assign to a read-only property

// private -> không truy cập trực tiếp, phải qua phương thức công khai.
// console.log(acc.balance)    // ❌ lỗi ts(2341): Property 'balance' is private
console.log('Số dư (qua getBalance):', acc.getBalance())

acc.deposit(100_000, '0000') // sai PIN -> bị từ chối
acc.deposit(100_000, '1234') // đúng PIN -> cộng tiền
acc.showInfo()
