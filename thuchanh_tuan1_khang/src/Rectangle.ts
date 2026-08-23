/**
 * Bài 4: Lớp Rectangle - hình chữ nhật với chiều rộng và chiều cao.
 */
export class Rectangle {
  protected width: number // chiều rộng
  protected height: number // chiều cao

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  /** Tính diện tích: rộng x cao. */
  getArea(): number {
    return this.width * this.height
  }

  /** Tính chu vi: (rộng + cao) x 2. */
  getPerimeter(): number {
    return (this.width + this.height) * 2
  }

  /** Hiển thị kích thước, diện tích và chu vi ra Console. */
  showInfo(): void {
    console.log(
      `HCN ${this.width} x ${this.height} -> Diện tích: ${this.getArea()} | Chu vi: ${this.getPerimeter()}`,
    )
  }

  /** Kiểm tra hình chữ nhật này có phải hình vuông không. */
  isSquare(): boolean {
    return this.width === this.height
  }
}
