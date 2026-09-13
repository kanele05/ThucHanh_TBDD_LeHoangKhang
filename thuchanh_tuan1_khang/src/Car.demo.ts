/**
 * Demo lớp Car (Bài 3). Chạy `npm run dev` rồi mở Console (F12) để xem kết quả.
 */
import { Car } from './Car'

const car1 = new Car('Toyota', 'Vios', 2020)
const car2 = new Car('VinFast', 'VF8', 2023)

console.log('===== BÀI 3: THÔNG TIN XE =====')
car1.showInfo() // Hãng: Toyota | Mẫu xe: Vios | Năm SX: 2020
car2.showInfo()

console.log(`Xe ${car1.getInfo()} -> đã dùng ${car1.getAge()} năm`)

// Duyệt một danh sách nhiều xe.
const danhSachXe: Car[] = [new Car('Honda', 'City', 2019), new Car('Mazda', 'CX-5', 2022)]
danhSachXe.forEach((xe, i) => {
  console.log(`Xe thứ ${i + 1}:`)
  xe.showInfo()
})
