/**
 * Bài 9: Interface Animal - bản hợp đồng quy định mọi con vật phải có
 * thuộc tính `name` và phương thức `sound()`.
 */
export interface Animal {
  name: string
  sound(): string
}

/** Lớp Dog thực thi (implements) interface Animal. */
export class Dog implements Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  // Bắt buộc phải có, nếu thiếu TypeScript sẽ báo lỗi.
  sound(): string {
    return 'Gâu gâu!'
  }
}

/** Lớp Cat cũng thực thi Animal nhưng kêu khác. */
export class Cat implements Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  sound(): string {
    return 'Meo meo!'
  }
}
