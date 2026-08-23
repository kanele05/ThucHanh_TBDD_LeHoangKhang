/**
 * Bài 22: Lớp Stack<T> - ngăn xếp hoạt động theo nguyên tắc LIFO
 * (Last In First Out: phần tử vào sau cùng sẽ ra trước).
 */
export class Stack<T> {
  private items: T[] = []

  /** Thêm phần tử vào ĐỈNH ngăn xếp. */
  push(item: T): void {
    this.items.push(item)
  }

  /** Lấy ra và XÓA phần tử ở đỉnh. Trả về undefined nếu stack rỗng. */
  pop(): T | undefined {
    return this.items.pop()
  }

  /** Xem phần tử ở đỉnh nhưng KHÔNG xóa. */
  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  /** Kiểm tra stack có rỗng không. */
  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  /** In stack theo thứ tự từ đỉnh xuống đáy. */
  showInfo(): void {
    console.log('Stack (đỉnh -> đáy):', [...this.items].reverse().join(', ') || '(rỗng)')
  }
}
