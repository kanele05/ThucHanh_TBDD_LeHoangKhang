/**
 * Demo generic Repository (Bài 21). Chạy `npm run dev`, mở Console (F12).
 */
import { Book } from './Book'
import { Product } from './Product'
import { Repository } from './Repository'

console.log('===== BÀI 21: GENERIC REPOSITORY =====')

// Kho chứa Book - TS chỉ cho phép add đúng kiểu Book.
const bookRepo = new Repository<Book>()
bookRepo.add(new Book('Clean Code', 'Robert C. Martin', 2008))
bookRepo.add(new Book('Số Đỏ', 'Vũ Trọng Phụng', 1936))
bookRepo.getAll().forEach((b) => b.showInfo())
console.log('Số sách trong kho:', bookRepo.count())

// Cùng một lớp Repository nhưng dùng cho kiểu Product.
const productRepo = new Repository<Product>()
productRepo.add(new Product('Bàn phím cơ', 150))
productRepo.add(new Product('Lót chuột', 30))
console.log('Sản phẩm đầu tiên:', productRepo.getAt(0)?.getInfo())

// bookRepo.add(new Product('X', 1))   // ❌ lỗi ts(2345): kho này chỉ nhận Book

// Kho chứa kiểu cơ bản cũng được.
const numberRepo = new Repository<number>()
;[10, 20, 30].forEach((n) => numberRepo.add(n))
numberRepo.removeAt(0)
console.log('Kho số sau khi xóa phần tử đầu:', numberRepo.getAll())
