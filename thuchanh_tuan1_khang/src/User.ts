/**
 * Bài 7: Lớp User - minh họa đóng gói với thuộc tính private và getter/setter.
 */
export class User {
  // Đặt tên biến là `_name` vì tên `name` đã dành cho getter/setter bên dưới.
  private _name: string

  constructor(name: string) {
    // Gán qua setter để dữ liệu ban đầu cũng được kiểm tra hợp lệ.
    this._name = ''
    this.name = name
  }

  /** GETTER: đọc giá trị, dùng như thuộc tính -> user.name */
  get name(): string {
    return this._name
  }

  /** SETTER: gán giá trị kèm kiểm tra hợp lệ -> user.name = 'ABC' */
  set name(value: string) {
    // trim() để loại bỏ khoảng trắng thừa ở hai đầu.
    const newName = value.trim()
    if (newName.length === 0) {
      console.log('Lỗi: tên không được để trống.')
      return
    }
    this._name = newName
  }

  showInfo(): void {
    console.log(`Người dùng: ${this._name}`)
  }
}
