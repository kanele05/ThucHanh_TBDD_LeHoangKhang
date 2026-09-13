/**
 * Demo interface Movable (Bài 29). Chạy `npm run dev`, mở Console (F12).
 */
import type { Movable } from './Movable'
import { Car, Robot } from './Movable'

console.log('===== BÀI 29: MOVABLE =====')

const car = new Car('Toyota')
const robot = new Robot('R2D2')

car.move(50)
robot.move(10)

/** Hàm nhận Movable nên chạy được với cả xe lẫn robot, dù hai lớp không hề liên quan. */
function diChuyen(items: Movable[], distance: number): void {
  items.forEach((i) => i.move(distance))
}

// Interface gom các lớp KHÁC HỌ lại theo cùng một khả năng.
diChuyen([car, robot], 20)
