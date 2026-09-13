/**
 * Demo lớp Book (Bài 6). Chạy `npm run dev` rồi mở Console (F12).
 */
import { Book } from './Book'

const book1 = new Book('Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', 1941)
const book2 = new Book('Clean Code', 'Robert C. Martin', 2008)

console.log('===== BÀI 6: THÔNG TIN SÁCH =====')
book1.showInfo()
book2.showInfo()

// Duyệt danh sách sách và lọc theo năm xuất bản.
const thuVien: Book[] = [book1, book2, new Book('Số Đỏ', 'Vũ Trọng Phụng', 1936)]
thuVien.forEach((s, i) => console.log(`${i + 1}. ${s.getInfo()}`))

const sachCu = thuVien.filter((s) => s.getYear() < 1950)
console.log('Sách xuất bản trước 1950:', sachCu.map((s) => s.getTitle()).join(', '))
