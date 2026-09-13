/**
 * Demo lớp Rectangle (Bài 4). Chạy `npm run dev` rồi mở Console (F12).
 */
import { Rectangle } from './Rectangle'

const hcn1 = new Rectangle(5, 3)
const hcn2 = new Rectangle(4, 4)

console.log('===== BÀI 4: HÌNH CHỮ NHẬT =====')
hcn1.showInfo() // HCN 5 x 3 -> Diện tích: 15 | Chu vi: 16
hcn2.showInfo() // HCN 4 x 4 -> Diện tích: 16 | Chu vi: 16

// Gọi riêng từng phương thức tính toán.
console.log('Diện tích hcn1:', hcn1.getArea())
console.log('Chu vi hcn1:', hcn1.getPerimeter())
console.log('hcn2 có phải hình vuông?', hcn2.isSquare()) // true
