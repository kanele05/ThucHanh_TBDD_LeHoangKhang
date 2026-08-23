/**
 * Bài 8: Lớp Product - sản phẩm với tên và giá.
 */
export class Product {
  protected name: string // tên sản phẩm
  protected price: number // giá sản phẩm

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }

  showInfo(): void {
    console.log(this.getInfo())
  }

  getInfo(): string {
    return `${this.name} - Giá: ${this.price}`
  }

  getName(): string {
    return this.name
  }

  getPrice(): number {
    return this.price
  }
}
