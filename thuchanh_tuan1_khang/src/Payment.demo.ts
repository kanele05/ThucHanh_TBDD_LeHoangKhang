/**
 * Demo interface Payment (Bài 23). Chạy `npm run dev`, mở Console (F12).
 */
import type { Payment } from './Payment'
import { CardPayment, CashPayment } from './Payment'

console.log('===== BÀI 23: THANH TOÁN =====')

const cash = new CashPayment(500_000)
const card = new CardPayment('9704123456781234')

cash.pay(300_000) // đủ tiền -> trả lại
cash.pay(900_000) // không đủ -> báo thiếu
card.pay(300_000) // cộng thêm phí 1%

/** Hàm nhận kiểu interface nên dùng được với mọi cách thanh toán. */
function thanhToan(method: Payment, amount: number): void {
  method.pay(amount)
}

// Muốn thêm ví điện tử sau này chỉ cần viết lớp mới implements Payment,
// không phải sửa hàm thanhToan().
const methods: Payment[] = [cash, card]
methods.forEach((m) => thanhToan(m, 100_000))
