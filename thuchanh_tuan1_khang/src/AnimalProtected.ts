/**
 * Bài 28: Lớp Animal có phương thức protected makeSound(), hai lớp con
 * Dog và Cat ghi đè lại. (File riêng để không trùng bài 11 và bài 19.)
 */
export class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  /**
   * protected: chỉ gọi được BÊN TRONG lớp này và các lớp con.
   * Bên ngoài gọi animal.makeSound() sẽ báo lỗi.
   */
  protected makeSound(): string {
    return '...'
  }

  /** public: đây là "cửa" để bên ngoài gián tiếp dùng makeSound(). */
  speak(): void {
    console.log(`${this.name}: ${this.makeSound()}`)
  }
}

export class Dog extends Animal {
  /** Ghi đè phương thức protected, vẫn giữ mức protected. */
  protected override makeSound(): string {
    return 'Gâu gâu!'
  }
}

export class Cat extends Animal {
  protected override makeSound(): string {
    return 'Meo meo!'
  }

  /** Lớp con được phép gọi makeSound() vì nó là protected chứ không phải private. */
  meowTwice(): void {
    console.log(`${this.name}: ${this.makeSound()} ${this.makeSound()}`)
  }
}
