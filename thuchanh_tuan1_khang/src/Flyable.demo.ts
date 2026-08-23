/**
 * Demo Flyable / Swimmable (Bài 12). Chạy `npm run dev`, mở Console (F12).
 */
import type { Flyable, Swimmable } from './Flyable'
import { Bird, Duck, Fish } from './Flyable'

const bird = new Bird('Chim sẻ')
const fish = new Fish('Cá vàng')
const duck = new Duck('Vịt bầu')

console.log('===== BÀI 12: FLYABLE / SWIMMABLE =====')
bird.fly()
fish.swim()
duck.fly()
duck.swim()

// Gom theo khả năng: mảng Flyable chứa mọi thứ biết bay, kể cả Duck.
const flyers: Flyable[] = [bird, duck]
flyers.forEach((f) => f.fly())

const swimmers: Swimmable[] = [fish, duck]
swimmers.forEach((s) => s.swim())

// const wrong: Flyable = fish   // ❌ lỗi: Fish không có phương thức fly()
