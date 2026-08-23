/**
 * Bài 12: Hai interface Flyable (biết bay) và Swimmable (biết bơi),
 * được thực thi bởi các lớp Bird, Fish và Duck (vịt - vừa bay vừa bơi).
 */
export interface Flyable {
  fly(): void
}

export interface Swimmable {
  swim(): void
}

/** Bird chỉ biết bay. */
export class Bird implements Flyable {
  name: string

  constructor(name: string) {
    this.name = name
  }

  fly(): void {
    console.log(`${this.name} đang bay trên trời.`)
  }
}

/** Fish chỉ biết bơi. */
export class Fish implements Swimmable {
  name: string

  constructor(name: string) {
    this.name = name
  }

  swim(): void {
    console.log(`${this.name} đang bơi dưới nước.`)
  }
}

/** Một lớp có thể thực thi NHIỀU interface cùng lúc, ngăn cách bằng dấu phẩy. */
export class Duck implements Flyable, Swimmable {
  name: string

  constructor(name: string) {
    this.name = name
  }

  fly(): void {
    console.log(`${this.name} vỗ cánh bay là là.`)
  }

  swim(): void {
    console.log(`${this.name} bơi trên mặt hồ.`)
  }
}
