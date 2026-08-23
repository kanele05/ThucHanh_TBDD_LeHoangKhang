/**
 * Bài 30: Lớp School chứa danh sách Student (bài 2) và Teacher (bài 27).
 */
import { Student } from './Student'
import { Teacher } from './Teacher'

export class School {
  private name: string
  private students: Student[] = []
  private teachers: Teacher[] = []

  constructor(name: string) {
    this.name = name
  }

  addStudent(student: Student): void {
    this.students.push(student)
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher)
  }

  /** Hiển thị toàn bộ thông tin trường - yêu cầu chính của bài. */
  displayInfo(): void {
    console.log(`===== ${this.name} =====`)
    console.log(`Giáo viên (${this.teachers.length}):`)
    this.teachers.forEach((t, i) => console.log(`  ${i + 1}. ${t.getInfo()}`))
    console.log(`Sinh viên (${this.students.length}):`)
    this.students.forEach((s, i) => console.log(`  ${i + 1}. ${s.getInfo()}`))
  }

  /** Điểm trung bình của toàn bộ sinh viên. */
  getAverageGrade(): number {
    if (this.students.length === 0) return 0
    const tong = this.students.reduce((sum, s) => sum + s.getGrade(), 0)
    return tong / this.students.length
  }

  /** Tìm sinh viên theo tên. */
  findStudent(name: string): Student | undefined {
    return this.students.find((s) => s.getName().toLowerCase() === name.toLowerCase())
  }
}
