/**
 * Demo static method (Bài 25). Chạy `npm run dev`, mở Console (F12).
 */
import { Shape } from './ShapeStatic'

console.log('===== BÀI 25: STATIC METHOD =====')

// Gọi phương thức static ngay khi chưa có đối tượng nào.
Shape.describe()
console.log('Số hình đã tạo:', Shape.getCount()) // 0

const tamGiac = new Shape('Tam giác', 3)
const hinhVuong = new Shape('Hình vuông', 4)

// Phương thức thường thì phải gọi qua đối tượng.
tamGiac.showInfo()
hinhVuong.showInfo()

// Biến static được chia sẻ chung, không thuộc riêng đối tượng nào.
console.log('Số hình đã tạo:', Shape.getCount()) // 2

// tamGiac.describe()   // ❌ lỗi ts(2339): describe() thuộc về lớp, không thuộc đối tượng
