/**
 * Demo interface Vehicle (Bài 20). Chạy `npm run dev`, mở Console (F12).
 */
import type { Vehicle } from './Vehicle'
import { Bike, Car } from './Vehicle'

const car = new Car('Toyota', 120)
const bike = new Bike('Giant', 25)

console.log('===== BÀI 20: VEHICLE =====')
car.start()
bike.start()

// Mảng kiểu Vehicle chứa cả Car lẫn Bike vì cả hai đều theo đúng hợp đồng.
const vehicles: Vehicle[] = [car, bike]
vehicles.forEach((v) => {
  v.start()
  v.stop()
})

// Xe nhanh nhất trong danh sách.
const fastest = vehicles.reduce((a, b) => (a.speed > b.speed ? a : b))
console.log('Xe nhanh nhất:', fastest.brand)
