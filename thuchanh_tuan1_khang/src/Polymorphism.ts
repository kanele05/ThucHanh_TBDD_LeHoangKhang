/**
 * Bài 19: Minh họa ghi đè phương thức (method overriding) và đa hình
 * (polymorphism) với lớp cha Animal cùng các lớp con.
 */
export class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  /** Phương thức sẽ được các lớp con ghi đè. */
  makeSound(): string {
    return '...'
  }

  /** Gọi makeSound() qua `this` -> chạy phiên bản của lớp con lúc runtime. */
  describe(): void {
    console.log(`${this.name} (${this.constructor.name}) kêu: ${this.makeSound()}`)
  }
}

export class Dog extends Animal {
  override makeSound(): string {
    return 'Gâu gâu!'
  }
}

export class Cat extends Animal {
  override makeSound(): string {
    return 'Meo meo!'
  }
}

export class Cow extends Animal {
  override makeSound(): string {
    return 'Ụm bò!'
  }

  /** Ghi đè nhưng vẫn dùng lại code của lớp cha qua `super.`. */
  override describe(): void {
    super.describe() // chạy phần in của lớp cha trước
    console.log(`${this.name} còn cho sữa nữa.`)
  }
}
