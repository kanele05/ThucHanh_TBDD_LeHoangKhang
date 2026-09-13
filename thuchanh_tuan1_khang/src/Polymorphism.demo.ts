/**
 * Demo overriding & polymorphism (Bài 19). Chạy `npm run dev`, mở Console (F12).
 */
import { Animal, Cat, Cow, Dog } from './Polymorphism'

console.log('===== BÀI 19: ĐA HÌNH =====')

// Cùng khai báo kiểu Animal, nhưng đối tượng thật là các lớp con khác nhau.
const animals: Animal[] = [new Animal('Sinh vật'), new Dog('Mực'), new Cat('Miu'), new Cow('Bò sữa')]

// Một dòng lệnh duy nhất -> mỗi đối tượng cho kết quả riêng.
animals.forEach((a) => a.describe())

/** Hàm nhận kiểu lớp cha nên dùng được cho MỌI lớp con - đây là lợi ích của đa hình. */
function nghe(animal: Animal): void {
  console.log('Nghe thấy:', animal.makeSound())
}

nghe(new Dog('Vện')) // Gâu gâu!
nghe(new Cat('Mun')) // Meo meo!
