/**
 * Bài 25: Lớp Shape với phương thức static describe().
 * (File riêng để không trùng với Shape abstract của bài 13.)
 */
export class Shape {
  private name: string
  private sides: number // số cạnh

  /** Đếm số hình đã tạo - biến static dùng chung cho cả lớp. */
  private static count = 0

  constructor(name: string, sides: number) {
    this.name = name
    this.sides = sides
    Shape.count++ // truy cập biến static qua TÊN LỚP, không phải `this`
  }

  /** static: gọi qua tên lớp Shape.describe(), không cần tạo đối tượng. */
  static describe(): void {
    console.log('Shape là lớp mô tả một hình học phẳng, xác định bởi tên và số cạnh.')
  }

  /** static: trả về số hình đã được tạo. */
  static getCount(): number {
    return Shape.count
  }

  /** Phương thức thường: phải có đối tượng mới gọi được. */
  showInfo(): void {
    console.log(`${this.name} có ${this.sides} cạnh.`)
  }
}
