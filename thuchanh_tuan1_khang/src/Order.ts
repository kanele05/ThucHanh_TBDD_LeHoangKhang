/**
 * Bài 26: Lớp Order - đơn hàng chứa danh sách Product (bài 8) và tính tổng tiền.
 */
import { Product } from './Product'

export class Order {
  private id: string
  private products: Product[] = []

  constructor(id: string) {
    this.id = id
  }

  /** Thêm sản phẩm vào đơn hàng. */
  addProduct(product: Product): void {
    this.products.push(product)
  }

  /** Tính tổng tiền: cộng dồn giá của tất cả sản phẩm. */
  getTotal(): number {
    return this.products.reduce((sum, p) => sum + p.getPrice(), 0)
  }

  /** Tổng tiền sau khi giảm giá theo phần trăm (mặc định không giảm). */
  getTotalWithDiscount(percent: number = 0): number {
    return this.getTotal() * (1 - percent / 100)
  }

  getProducts(): Product[] {
    return [...this.products]
  }

  /** In hóa đơn. */
  showInfo(): void {
    console.log(`--- Đơn hàng ${this.id} (${this.products.length} sản phẩm) ---`)
    this.products.forEach((p, i) => console.log(`${i + 1}. ${p.getInfo()}`))
    console.log(`Tổng tiền: ${this.getTotal()}`)
  }
}
