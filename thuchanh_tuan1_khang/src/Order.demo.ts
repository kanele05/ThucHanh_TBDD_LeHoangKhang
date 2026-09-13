/**
 * Demo lớp Order (Bài 26). Chạy `npm run dev`, mở Console (F12).
 */
import { Order } from './Order'
import { Product } from './Product'

console.log('===== BÀI 26: ĐƠN HÀNG =====')

const order = new Order('DH001')
order.addProduct(new Product('Bàn phím cơ', 150))
order.addProduct(new Product('Chuột không dây', 80))
order.addProduct(new Product('Tai nghe', 250))

order.showInfo()

console.log('Tổng tiền:', order.getTotal()) // 480
console.log('Sau giảm 10%:', order.getTotalWithDiscount(10)) // 432

// Đơn rỗng thì tổng tiền bằng 0, không bị lỗi.
console.log('Đơn hàng rỗng:', new Order('DH002').getTotal()) // 0
