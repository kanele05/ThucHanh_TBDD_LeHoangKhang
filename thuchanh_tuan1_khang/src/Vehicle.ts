/**
 * Bài 20: Interface Vehicle và hai lớp Car, Bike thực thi nó.
 * (Lớp Car ở đây độc lập với Car của bài 3 vì nằm ở file khác.)
 */
export interface Vehicle {
  brand: string
  speed: number
  start(): void
  stop(): void
}

export class Car implements Vehicle {
  brand: string
  speed: number
  private wheels = 4 // thuộc tính riêng, ngoài hợp đồng của interface

  constructor(brand: string, speed: number) {
    this.brand = brand
    this.speed = speed
  }

  start(): void {
    console.log(`Ô tô ${this.brand} nổ máy, chạy ${this.speed} km/h (${this.wheels} bánh).`)
  }

  stop(): void {
    console.log(`Ô tô ${this.brand} đã dừng.`)
  }
}

export class Bike implements Vehicle {
  brand: string
  speed: number

  constructor(brand: string, speed: number) {
    this.brand = brand
    this.speed = speed
  }

  start(): void {
    console.log(`Xe đạp ${this.brand} bắt đầu lăn bánh, ${this.speed} km/h.`)
  }

  stop(): void {
    console.log(`Xe đạp ${this.brand} đã dừng.`)
  }
}
