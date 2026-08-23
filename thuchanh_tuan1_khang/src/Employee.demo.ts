/**
 * Demo Employee -> Manager, Developer (Bài 14). Chạy `npm run dev`, mở Console (F12).
 */
import { Developer, Employee, Manager } from './Employee'

const mgr = new Manager('Trần Văn B', 20000, 6)
const dev = new Developer('Lê Hoàng Khang', 15000, 'TypeScript')

console.log('===== BÀI 14: NHÂN VIÊN =====')

// Phương thức riêng của từng lớp con.
mgr.manageTeam()
dev.writeCode()

// Đa hình: cùng gọi showInfo() nhưng lương và chức vụ tính theo từng lớp.
const staff: Employee[] = [new Employee('Nguyễn Văn A', 10000), mgr, dev]
staff.forEach((e) => e.showInfo())

const tongLuong = staff.reduce((sum, e) => sum + e.getSalary(), 0)
console.log('Tổng quỹ lương:', tongLuong)
