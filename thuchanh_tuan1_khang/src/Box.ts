/**
 * Bài 16: Lớp generic Box<T> - hộp chứa được giá trị thuộc BẤT KỲ kiểu nào.
 * `T` là tham số kiểu, được quyết định lúc tạo đối tượng: new Box<number>(5).
 */
export class Box<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  /** Lấy giá trị ra, TypeScript vẫn nhớ đúng kiểu T. */
  getValue(): T {
    return this.value
  }

  /** Thay giá trị mới, bắt buộc cùng kiểu T. */
  setValue(value: T): void {
    this.value = value
  }

  showInfo(): void {
    console.log(`Box chứa: ${String(this.value)} (kiểu: ${typeof this.value})`)
  }
}
