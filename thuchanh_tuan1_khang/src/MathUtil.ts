/**
 * Bài 18: Lớp tiện ích MathUtil - mọi phương thức đều `static` nên gọi thẳng
 * qua tên lớp (MathUtil.add(1, 2)), không cần tạo đối tượng.
 */
export class MathUtil {
  /** Hằng số dùng chung, readonly để không ai sửa được. */
  static readonly PI = 3.14159

  /** private constructor -> chặn việc tạo đối tượng vô nghĩa từ lớp tiện ích. */
  private constructor() {}

  static add(a: number, b: number): number {
    return a + b
  }

  static subtract(a: number, b: number): number {
    return a - b
  }

  static multiply(a: number, b: number): number {
    return a * b
  }

  /** Chia: báo lỗi nếu mẫu số bằng 0. */
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Không thể chia cho 0.')
    }
    return a / b
  }
}
