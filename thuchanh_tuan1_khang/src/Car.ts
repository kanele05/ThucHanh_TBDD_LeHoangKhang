/**
 * Bài 3: Lớp Car - mô tả một chiếc xe với hãng, mẫu xe và năm sản xuất.
 */
export class Car {
  protected brand: string // hãng xe, vd: Toyota
  protected model: string // mẫu xe, vd: Vios
  protected year: number // năm sản xuất

  constructor(brand: string, model: string, year: number) {
    this.brand = brand
    this.model = model
    this.year = year
  }

  /** Hiển thị thông tin xe ra Console (yêu cầu chính của bài). */
  showInfo(): void {
    console.log(this.getInfo())
  }

  /** Trả về chuỗi thông tin xe, dùng khi cần hiển thị lên giao diện. */
  getInfo(): string {
    return `Hãng: ${this.brand} | Mẫu xe: ${this.model} | Năm SX: ${this.year}`
  }

  /** Số năm tuổi của xe tính đến hiện tại. */
  getAge(): number {
    return new Date().getFullYear() - this.year
  }
}
