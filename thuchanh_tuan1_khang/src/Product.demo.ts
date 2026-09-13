/**
 * Demo lớp Product (Bài 8). Chạy `npm run dev` rồi mở Console (F12).
 */
import { Product } from './Product'

// Mảng chứa các đối tượng Product.
const products: Product[] = [
  new Product('Bàn phím cơ', 150),
  new Product('Chuột không dây', 80),
  new Product('Tai nghe', 250),
  new Product('Lót chuột', 30),
  new Product('Webcam', 120),
]

console.log('===== BÀI 8: DANH SÁCH SẢN PHẨM =====')
products.forEach((p) => p.showInfo())

// filter() tạo ra mảng mới chỉ gồm các phần tử thỏa điều kiện giá > 100.
const expensive = products.filter((p) => p.getPrice() > 100)

console.log('===== SẢN PHẨM CÓ GIÁ > 100 =====')
expensive.forEach((p) => p.showInfo())
console.log(`Tìm được ${expensive.length}/${products.length} sản phẩm.`)
