/**
 * Demo lớp static MathUtil (Bài 18). Chạy `npm run dev`, mở Console (F12).
 */
import { MathUtil } from './MathUtil'

console.log('===== BÀI 18: MATHUTIL =====')

// Gọi trực tiếp qua tên lớp, không cần `new`.
console.log('10 + 5 =', MathUtil.add(10, 5))
console.log('10 - 5 =', MathUtil.subtract(10, 5))
console.log('10 * 5 =', MathUtil.multiply(10, 5))
console.log('10 / 5 =', MathUtil.divide(10, 5))
console.log('Hằng số PI:', MathUtil.PI)

// const m = new MathUtil()   // ❌ lỗi ts(2673): constructor là private

// try...catch để bắt lỗi chia cho 0.
try {
  MathUtil.divide(10, 0)
} catch (err) {
  console.log('Bắt được lỗi:', (err as Error).message)
}
