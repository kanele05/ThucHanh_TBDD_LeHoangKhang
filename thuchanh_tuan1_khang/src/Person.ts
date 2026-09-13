/**
 * =============================================================================
 *  Bài 1: Lớp Person (Con người)
 * -----------------------------------------------------------------------------
 *  Yêu cầu: Tạo một lớp Person có 2 thuộc tính là `name` (tên) và `age` (tuổi),
 *           đồng thời viết một phương thức để hiển thị các thông tin này.
 *
 *  Kiến thức áp dụng (OOP - Lập trình hướng đối tượng):
 *    - class        : khuôn mẫu (bản thiết kế) để tạo ra các đối tượng.
 *    - property     : thuộc tính - dữ liệu mà mỗi đối tượng nắm giữ.
 *    - constructor  : hàm khởi tạo - chạy tự động khi tạo đối tượng bằng `new`.
 *    - method       : phương thức - hành vi mà đối tượng có thể thực hiện.
 *    - encapsulation: đóng gói - che giấu dữ liệu bên trong, chỉ cho phép truy
 *                     cập thông qua các phương thức công khai (getter/setter).
 * =============================================================================
 */

/**
 * Lớp `Person` mô tả một con người với hai thông tin cơ bản: họ tên và tuổi.
 *
 * @example
 * const p = new Person('Lê Hoàng Khang', 20)
 * p.displayInfo()   // In: Họ tên: Lê Hoàng Khang | Tuổi: 20
 */
export class Person {
  /**
   * Thuộc tính `name` - họ và tên của người đó.
   *
   * `protected` nghĩa là thuộc tính này CHỈ được truy cập từ bên trong lớp
   * `Person` VÀ trong các lớp con kế thừa nó (ví dụ lớp `Student`).
   * Bên ngoài lớp (ví dụ trong file App.tsx) sẽ không thể viết
   * `p.name = '...'` để sửa trực tiếp -> đây chính là tính ĐÓNG GÓI, giúp dữ
   * liệu luôn đi qua các "cổng kiểm soát" (constructor / setter) mà ta viết ra.
   *
   * Lưu ý phân biệt 3 mức truy cập:
   *   - `public`    : ai cũng truy cập được (mặc định nếu không ghi gì).
   *   - `protected` : chỉ lớp này và các LỚP CON truy cập được.
   *   - `private`   : chỉ duy nhất lớp này truy cập được, lớp con cũng không.
   * Ở bài 2 ta cần lớp con `Student` đọc được `name`/`age` nên dùng `protected`.
   */
  protected name: string

  /**
   * Thuộc tính `age` - tuổi của người đó, tính bằng số năm (số nguyên >= 0).
   */
  protected age: number

  /**
   * Hàm khởi tạo (constructor).
   *
   * Được gọi TỰ ĐỘNG mỗi khi ta dùng từ khóa `new` để tạo một đối tượng mới,
   * ví dụ: `new Person('Lê Hoàng Khang', 20)`.
   * Nhiệm vụ của nó là gán giá trị ban đầu cho các thuộc tính của đối tượng.
   *
   * @param name Họ và tên của người (chuỗi ký tự).
   * @param age  Tuổi của người (số nguyên không âm).
   */
  constructor(name: string, age: number) {
    // Từ khóa `this` đại diện cho chính đối tượng đang được tạo ra.
    // `this.name` là thuộc tính của đối tượng, còn `name` (không có `this`)
    // là tham số truyền vào -> phải dùng `this` để phân biệt hai cái này.
    this.name = name
    this.age = age
  }

  /**
   * Phương thức hiển thị thông tin - đây là yêu cầu chính của bài tập.
   *
   * Phương thức này in ra màn hình Console (F12 -> tab Console của trình duyệt)
   * họ tên và tuổi của đối tượng hiện tại.
   */
  displayInfo(): void {
    // Template string (dấu ` `) cho phép nhúng biến vào chuỗi bằng cú pháp ${}.
    console.log(`Họ tên: ${this.name} | Tuổi: ${this.age}`)
  }

  /**
   * Phương thức phụ: trả về chuỗi thông tin thay vì in ra Console.
   *
   * Vì sao cần thêm hàm này? Vì `displayInfo()` chỉ in ra Console, còn khi muốn
   * hiển thị thông tin lên GIAO DIỆN (React) thì ta cần một chuỗi để render.
   * Tách riêng "lấy dữ liệu" và "in dữ liệu" giúp lớp dùng được ở nhiều nơi.
   *
   * @returns Chuỗi mô tả thông tin của người đó.
   */
  getInfo(): string {
    return `Họ tên: ${this.name} | Tuổi: ${this.age}`
  }

  // ---------------------------------------------------------------------------
  // GETTER: các phương thức cho phép ĐỌC giá trị của thuộc tính private từ bên
  // ngoài lớp (chỉ đọc, không sửa được) -> an toàn hơn thuộc tính public.
  // ---------------------------------------------------------------------------

  /** Lấy ra họ tên của người này. */
  getName(): string {
    return this.name
  }

  /** Lấy ra tuổi của người này. */
  getAge(): number {
    return this.age
  }
}
