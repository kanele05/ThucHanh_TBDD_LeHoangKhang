/**
 * Demo kế thừa Animal -> Dog, Cat (Bài 11). Chạy `npm run dev`, mở Console (F12).
 */
import { Animal, Cat, Dog } from './AnimalClass'

const dog = new Dog('Mực')
const cat = new Cat('Miu')

console.log('===== BÀI 11: ANIMAL / DOG / CAT =====')

// Phương thức riêng của từng lớp con.
dog.bark() // Mực: Gâu gâu!
cat.meow() // Miu: Meo meo!

// showInfo() không viết trong Dog/Cat nhưng vẫn gọi được nhờ kế thừa.
dog.showInfo()
cat.showInfo()

// Đa hình: cùng gọi makeSound() nhưng mỗi lớp cho kết quả khác nhau.
const animals: Animal[] = [new Animal('Con vật lạ'), dog, cat]
animals.forEach((a) => a.makeSound())
