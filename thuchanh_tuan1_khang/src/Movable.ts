/**
 * Bài 29: Interface Movable với phương thức move(), được thực thi bởi
 * hai lớp hoàn toàn khác loại: Car và Robot.
 */
export interface Movable {
  move(distance: number): void
}

export class Car implements Movable {
  private brand: string
  private position = 0 // vị trí hiện tại (km)

  constructor(brand: string) {
    this.brand = brand
  }

  move(distance: number): void {
    this.position += distance
    console.log(`Ô tô ${this.brand} chạy ${distance} km, vị trí hiện tại: ${this.position} km.`)
  }
}

export class Robot implements Movable {
  private id: string
  private steps = 0 // tổng số bước đã đi

  constructor(id: string) {
    this.id = id
  }

  move(distance: number): void {
    this.steps += distance
    console.log(`Robot ${this.id} bước ${distance} bước, tổng cộng: ${this.steps} bước.`)
  }
}
