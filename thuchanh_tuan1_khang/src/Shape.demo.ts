/**
 * Demo lớp trừu tượng Shape (Bài 13). Chạy `npm run dev`, mở Console (F12).
 */
import type { Shape } from './Shape'
import { Circle, Square } from './Shape'

const square = new Square(5)
const circle = new Circle(3)

console.log('===== BÀI 13: ABSTRACT SHAPE =====')
square.showInfo() // Hình vuông -> Diện tích: 25.00
circle.showInfo() // Hình tròn -> Diện tích: 28.27

// const s = new Shape('X')   // ❌ lỗi ts(2511): không tạo đối tượng từ lớp abstract

// Đa hình: mảng Shape[] chứa mọi hình, mỗi hình tự tính diện tích theo cách riêng.
const shapes: Shape[] = [square, circle, new Square(2)]
shapes.forEach((s) => s.showInfo())

const tong = shapes.reduce((sum, s) => sum + s.area(), 0)
console.log('Tổng diện tích:', tong.toFixed(2))
