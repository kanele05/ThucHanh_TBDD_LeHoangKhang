/**
 * Bài 21: Lớp generic Repository<T> - kho lưu trữ dùng chung cho mọi kiểu dữ liệu.
 */
export class Repository<T> {
  private items: T[] = [] // danh sách phần tử, ban đầu rỗng

  /** Thêm một phần tử vào kho. */
  add(item: T): void {
    this.items.push(item)
  }

  /** Lấy toàn bộ phần tử. Dùng [...] để trả về bản sao, tránh sửa mảng gốc từ ngoài. */
  getAll(): T[] {
    return [...this.items]
  }

  /** Lấy phần tử theo vị trí, trả về undefined nếu vượt quá danh sách. */
  getAt(index: number): T | undefined {
    return this.items[index]
  }

  /** Xóa phần tử theo vị trí, trả về true nếu xóa được. */
  removeAt(index: number): boolean {
    if (index < 0 || index >= this.items.length) return false
    this.items.splice(index, 1)
    return true
  }

  /** Số phần tử đang có trong kho. */
  count(): number {
    return this.items.length
  }
}
