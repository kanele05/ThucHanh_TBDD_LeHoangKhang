/**
 * Demo lớp trừu tượng Appliance (Bài 24). Chạy `npm run dev`, mở Console (F12).
 */
import type { Appliance } from './Appliance'
import { AirConditioner, Fan } from './Appliance'

console.log('===== BÀI 24: THIẾT BỊ ĐIỆN =====')

const fan = new Fan(3)
const ac = new AirConditioner(22)

// const a = new Appliance('X')   // ❌ lỗi ts(2511): lớp abstract không tạo đối tượng được

fan.turnOn()
ac.turnOn()
ac.setTemperature(26) // phương thức riêng của AirConditioner

// Đa hình: bật tất cả thiết bị bằng một vòng lặp.
const devices: Appliance[] = [fan, ac]
devices.forEach((d) => d.showStatus())

console.log('--- Tắt hết ---')
devices.forEach((d) => d.turnOff()) // turnOff() viết một lần ở lớp cha
devices.forEach((d) => d.showStatus())
