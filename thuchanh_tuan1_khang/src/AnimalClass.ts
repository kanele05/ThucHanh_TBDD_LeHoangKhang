/**
 * Bài 11: Lớp cha Animal và hai lớp con Dog, Cat.
 * (Bài 9 dùng interface, bài này dùng class kế thừa - tên file khác nhau để
 *  hai bài không bị trùng.)
 */
export class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  /** Tiếng kêu chung, lớp con sẽ ghi đè lại. */
  makeSound(): void {
    console.log(`${this.name} phát ra tiếng kêu.`)
  }

  showInfo(): void {
    console.log(`Tên con vật: ${this.name}`)
  }

  getName(): string {
    return this.name
  }
}

/** Lớp con Dog với phương thức riêng bark(). */
export class Dog extends Animal {
  bark(): void {
    console.log(`${this.name}: Gâu gâu!`)
  }

  override makeSound(): void {
    this.bark()
  }
}

/** Lớp con Cat với phương thức riêng meow(). */
export class Cat extends Animal {
  meow(): void {
    console.log(`${this.name}: Meo meo!`)
  }

  override makeSound(): void {
    this.meow()
  }
}
