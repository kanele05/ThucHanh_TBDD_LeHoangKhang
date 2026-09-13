/**
 * Bài 27: Lớp Teacher kế thừa Person (bài 1), thêm thuộc tính subject
 * và phương thức introduce().
 */
import { Person } from './Person'

export class Teacher extends Person {
  protected subject: string // môn dạy

  constructor(name: string, age: number, subject: string) {
    super(name, age) // gọi constructor lớp cha để gán name, age
    this.subject = subject
  }

  /** Giáo viên tự giới thiệu. */
  introduce(): void {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}.`)
  }

  override getInfo(): string {
    return `${super.getInfo()} | Môn dạy: ${this.subject}`
  }

  override displayInfo(): void {
    console.log(this.getInfo())
  }

  getSubject(): string {
    return this.subject
  }
}
