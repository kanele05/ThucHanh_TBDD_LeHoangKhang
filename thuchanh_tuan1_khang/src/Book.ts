/**
 * Bài 6: Lớp Book - mô tả một cuốn sách.
 */
export class Book {
  protected title: string // tên sách
  protected author: string // tác giả
  protected year: number // năm xuất bản

  constructor(title: string, author: string, year: number) {
    this.title = title
    this.author = author
    this.year = year
  }

  /** Hiển thị thông tin sách ra Console. */
  showInfo(): void {
    console.log(this.getInfo())
  }

  /** Trả về chuỗi thông tin sách. */
  getInfo(): string {
    return `Tên sách: ${this.title} | Tác giả: ${this.author} | Năm XB: ${this.year}`
  }

  getTitle(): string {
    return this.title
  }

  getAuthor(): string {
    return this.author
  }

  getYear(): number {
    return this.year
  }
}
