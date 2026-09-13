/**
 * Bài 14: Lớp cha Employee và hai lớp con Manager, Developer.
 */
export class Employee {
  protected name: string
  protected salary: number // lương cơ bản

  constructor(name: string, salary: number) {
    this.name = name
    this.salary = salary
  }

  /** Lương thực nhận - lớp con ghi đè để cộng thêm phụ cấp. */
  getSalary(): number {
    return this.salary
  }

  showInfo(): void {
    console.log(`${this.name} | Chức vụ: ${this.getRole()} | Lương: ${this.getSalary()}`)
  }

  /** Tên chức vụ, lớp con ghi đè lại. */
  getRole(): string {
    return 'Nhân viên'
  }
}

/** Manager: quản lý một đội và có thêm thưởng quản lý. */
export class Manager extends Employee {
  private teamSize: number

  constructor(name: string, salary: number, teamSize: number) {
    super(name, salary)
    this.teamSize = teamSize
  }

  /** Phương thức riêng của Manager. */
  manageTeam(): void {
    console.log(`${this.name} đang quản lý đội gồm ${this.teamSize} người.`)
  }

  override getRole(): string {
    return 'Quản lý'
  }

  /** Mỗi thành viên trong đội được cộng thêm 500 vào lương. */
  override getSalary(): number {
    return this.salary + this.teamSize * 500
  }
}

/** Developer: viết code bằng một ngôn ngữ cụ thể. */
export class Developer extends Employee {
  private language: string

  constructor(name: string, salary: number, language: string) {
    super(name, salary)
    this.language = language
  }

  /** Phương thức riêng của Developer. */
  writeCode(): void {
    console.log(`${this.name} đang viết code bằng ${this.language}.`)
  }

  override getRole(): string {
    return `Lập trình viên ${this.language}`
  }
}
