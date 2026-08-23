/**
 * Bài 13: Lớp trừu tượng Shape với phương thức area().
 * `abstract` = lớp khuôn mẫu, KHÔNG tạo đối tượng trực tiếp được,
 * bắt buộc lớp con phải cài đặt các phương thức abstract.
 */
export abstract class Shape {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  /** Chỉ khai báo, không có phần thân -> lớp con bắt buộc phải viết. */
  abstract area(): number

  /** Phương thức thường: lớp con dùng lại luôn, không cần viết lại. */
  showInfo(): void {
    console.log(`${this.name} -> Diện tích: ${this.area().toFixed(2)}`)
  }
}

/** Hình vuông: diện tích = cạnh x cạnh. */
export class Square extends Shape {
  private side: number

  constructor(side: number) {
    super('Hình vuông')
    this.side = side
  }

  override area(): number {
    return this.side * this.side
  }
}

/** Hình tròn: diện tích = π x r². */
export class Circle extends Shape {
  private radius: number

  constructor(radius: number) {
    super('Hình tròn')
    this.radius = radius
  }

  override area(): number {
    return Math.PI * this.radius ** 2
  }
}
