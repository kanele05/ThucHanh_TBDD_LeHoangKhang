/**
 * Demo phương thức protected (Bài 28). Chạy `npm run dev`, mở Console (F12).
 */
import { Animal, Cat, Dog } from './AnimalProtected'

console.log('===== BÀI 28: PROTECTED METHOD =====')

const dog = new Dog('Mực')
const cat = new Cat('Miu')

// Gọi qua phương thức public speak(), bên trong nó mới gọi makeSound().
dog.speak() // Mực: Gâu gâu!
cat.speak() // Miu: Meo meo!
cat.meowTwice() // Miu: Meo meo! Meo meo!

// dog.makeSound()   // ❌ lỗi ts(2445): makeSound() là protected, không gọi từ ngoài

// Đa hình vẫn hoạt động: speak() ở lớp cha tự chọn đúng makeSound() của lớp con.
const animals: Animal[] = [new Animal('Sinh vật'), dog, cat]
animals.forEach((a) => a.speak())
