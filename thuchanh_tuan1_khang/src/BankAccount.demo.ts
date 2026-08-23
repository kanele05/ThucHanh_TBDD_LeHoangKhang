/**
 * Demo lớp BankAccount (Bài 5). Chạy `npm run dev` rồi mở Console (F12).
 */
import { BankAccount } from './BankAccount'

const tk = new BankAccount('Lê Hoàng Khang', 1_000_000)

console.log('===== BÀI 5: TÀI KHOẢN NGÂN HÀNG =====')
tk.showInfo() // Chủ TK: Lê Hoàng Khang | Số dư: 1.000.000 đ

tk.deposit(500_000) // nạp thành công -> 1.500.000 đ
tk.withdraw(200_000) // rút thành công -> 1.300.000 đ

// Các trường hợp lỗi: số tiền không hợp lệ và rút quá số dư.
tk.deposit(-100)
tk.withdraw(10_000_000)

console.log('Số dư cuối cùng:', tk.getBalance())
