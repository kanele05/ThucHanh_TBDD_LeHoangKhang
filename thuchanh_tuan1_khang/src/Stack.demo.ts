/**
 * Demo lớp Stack (Bài 22). Chạy `npm run dev`, mở Console (F12).
 */
import { Stack } from './Stack'

console.log('===== BÀI 22: STACK =====')

const stack = new Stack<number>()
console.log('Stack rỗng?', stack.isEmpty()) // true

stack.push(10)
stack.push(20)
stack.push(30)
stack.showInfo() // 30, 20, 10

console.log('peek (xem đỉnh):', stack.peek()) // 30 - vẫn còn trong stack
console.log('pop (lấy đỉnh ra):', stack.pop()) // 30 - đã bị xóa
stack.showInfo() // 20, 10
console.log('Số phần tử còn lại:', stack.size())

// Lấy hết phần tử ra -> thấy rõ thứ tự LIFO.
while (!stack.isEmpty()) {
  console.log('Lấy ra:', stack.pop())
}
console.log('pop khi rỗng trả về:', stack.pop()) // undefined

// Stack dùng được với mọi kiểu dữ liệu.
const strStack = new Stack<string>()
strStack.push('a')
strStack.push('b')
console.log('Đỉnh của stack chuỗi:', strStack.peek()) // b
