
// Nhập lớp cha `Person` để có thể kế thừa từ nó.
import { Person } from './Person'

/**
 * Lớp `Student` mô tả một sinh viên: là một `Person` (có tên, tuổi) và có
 * thêm điểm số `grade`.
 *
 * @example
 * const sv = new Student('Lê Hoàng Khang', 20, 8.5)
 * sv.displayAllInfo()   // Họ tên: ... | Tuổi: ... | Điểm: 8.5 (Giỏi)
 */
export class Student extends Person {
  /**
   * Thuộc tính riêng của lớp con: `grade` - điểm trung bình của sinh viên
   * (thang điểm 10, ví dụ 8.5).
   *
   * Dùng `protected` để nếu sau này có lớp cháu kế thừa `Student` thì lớp đó
   * vẫn đọc được `grade`.
   */
  protected grade: number

  /**
   * Hàm khởi tạo của lớp con.
   *
   * Quy tắc bắt buộc: trong constructor của lớp con, phải gọi `super(...)`
   * TRƯỚC khi dùng `this`. Vì lớp cha cần được khởi tạo xong thì đối tượng
   * mới "tồn tại" đầy đủ để lớp con gán thêm dữ liệu của mình.
   *
   * @param name  Họ và tên sinh viên.
   * @param age   Tuổi của sinh viên.
   * @param grade Điểm trung bình (thang 10).
   */
  constructor(name: string, age: number, grade: number) {
    // Gọi constructor của lớp cha `Person` để gán `name` và `age`.
    // Nhờ vậy lớp con không phải viết lại đoạn code gán 2 thuộc tính đó
    // -> đây chính là lợi ích "tái sử dụng code" của kế thừa.
    super(name, age)

    // Sau khi lớp cha khởi tạo xong, lớp con gán nốt thuộc tính riêng của mình.
    this.grade = grade
  }

  /**
   * Phương thức hiển thị TẤT CẢ thông tin - yêu cầu chính của bài 2.
   *
   * In ra Console cả 3 thông tin: họ tên, tuổi (thừa hưởng từ Person) và
   * điểm số (của riêng Student), kèm theo xếp loại học lực.
   */
  displayAllInfo(): void {
    // `this.name` và `this.age` truy cập được ở đây là nhờ chúng được khai báo
    // `protected` trong lớp cha Person (nếu để `private` thì dòng này sẽ báo lỗi).
    console.log(
      `Họ tên: ${this.name} | Tuổi: ${this.age} | Điểm: ${this.grade} (${this.getRank()})`,
    )
  }

  /**
   * GHI ĐÈ (override) phương thức `displayInfo()` của lớp cha.
   *
   * Từ khóa `override` báo cho TypeScript biết ta đang cố ý viết lại một
   * phương thức đã có ở lớp cha (nếu gõ sai tên, trình biên dịch sẽ báo lỗi).
   *
   * Nhờ ghi đè, khi ta gọi `displayInfo()` trên một đối tượng Student thì
   * thông tin điểm cũng được in ra -> minh họa tính ĐA HÌNH.
   */
  override displayInfo(): void {
    this.displayAllInfo()
  }

  /**
   * GHI ĐÈ phương thức `getInfo()` để trả về chuỗi đầy đủ thông tin.
   *
   * @returns Chuỗi gồm họ tên, tuổi, điểm và xếp loại.
   */
  override getInfo(): string {
    // `super.getInfo()` gọi phiên bản của LỚP CHA (trả về "Họ tên: ... | Tuổi: ...")
    // rồi ta nối thêm phần thông tin riêng của lớp con -> tái sử dụng code cha.
    return `${super.getInfo()} | Điểm: ${this.grade} (${this.getRank()})`
  }

  /** Lấy ra điểm trung bình của sinh viên. */
  getGrade(): number {
    return this.grade
  }

  /**
   * Xếp loại học lực dựa trên điểm trung bình (thang điểm 10).
   *
   * @returns Chuỗi xếp loại: Xuất sắc / Giỏi / Khá / Trung bình / Yếu.
   */
  getRank(): string {
    // Chuỗi if...else if kiểm tra từ mốc điểm cao xuống thấp.
    if (this.grade >= 9) return 'Xuất sắc'
    else if (this.grade >= 8) return 'Giỏi'
    else if (this.grade >= 6.5) return 'Khá'
    else if (this.grade >= 5) return 'Trung bình'
    else return 'Yếu'
  }
}
