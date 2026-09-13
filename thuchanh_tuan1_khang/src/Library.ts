/**
 * Bài 15: Lớp Library - thư viện lưu danh sách Book (bài 6) và User (bài 7).
 * Đây là quan hệ "composition": một lớp chứa các đối tượng của lớp khác.
 */
import { Book } from './Book'
import { User } from './User'

export class Library {
  private name: string
  private books: Book[] = [] // danh sách sách, ban đầu rỗng
  private users: User[] = [] // danh sách người dùng

  constructor(name: string) {
    this.name = name
  }

  /** Thêm một cuốn sách vào thư viện (yêu cầu chính của bài). */
  addBook(book: Book): void {
    this.books.push(book)
    console.log(`Đã thêm sách: ${book.getTitle()}`)
  }

  /** Thêm một người dùng. */
  addUser(user: User): void {
    this.users.push(user)
    console.log(`Đã thêm người dùng: ${user.name}`)
  }

  /** Tìm sách theo tên (không phân biệt hoa thường). */
  findBook(title: string): Book | undefined {
    return this.books.find((b) => b.getTitle().toLowerCase() === title.toLowerCase())
  }

  getBooks(): Book[] {
    return this.books
  }

  /** In toàn bộ thông tin thư viện. */
  showInfo(): void {
    console.log(`--- ${this.name}: ${this.books.length} sách, ${this.users.length} người dùng ---`)
    this.books.forEach((b, i) => console.log(`${i + 1}. ${b.getInfo()}`))
    this.users.forEach((u, i) => console.log(`Người dùng ${i + 1}: ${u.name}`))
  }
}
