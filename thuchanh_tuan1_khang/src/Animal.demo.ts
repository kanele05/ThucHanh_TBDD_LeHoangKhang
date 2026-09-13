/**
 * Demo interface Animal (Bài 9). Chạy `npm run dev` rồi mở Console (F12).
 */
// `import type` dùng cho interface vì nó chỉ tồn tại lúc biên dịch, không có ở runtime.
import type { Animal } from './Animal'
import { Cat, Dog } from './Animal'

console.log('===== BÀI 9: INTERFACE ANIMAL =====')

const dog = new Dog('Mực')
console.log(`${dog.name} kêu: ${dog.sound()}`)

// Một object thường cũng dùng được, miễn là có đủ `name` và `sound()`.
const bird: Animal = {
  name: 'Vẹt',
  sound: () => 'Quác quác!',
}

// Mảng kiểu Animal chứa được mọi thứ tuân theo interface -> tính đa hình.
const animals: Animal[] = [dog, new Cat('Miu'), bird]
animals.forEach((a) => console.log(`${a.name} kêu: ${a.sound()}`))
