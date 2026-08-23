import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Bài 1: chạy phần demo của lớp Person -> xem kết quả ở Console (F12).
import './Person.demo'
// Bài 2: chạy phần demo của lớp Student (kế thừa Person).
import './Student.demo'
// Bài 3: demo lớp Car.
import './Car.demo'
// Bài 4: demo lớp Rectangle.
import './Rectangle.demo'
// Bài 5: demo lớp BankAccount.
import './BankAccount.demo'
// Bài 6: demo lớp Book.
import './Book.demo'
// Bài 7: demo lớp User (getter/setter).
import './User.demo'
// Bài 8: demo lớp Product (lọc theo giá).
import './Product.demo'
// Bài 9: demo interface Animal.
import './Animal.demo'
// Bài 10: demo lớp Account (public/private/readonly).
import './Account.demo'
// Bài 11: demo kế thừa Animal -> Dog, Cat.
import './AnimalClass.demo'
// Bài 12: demo interface Flyable / Swimmable.
import './Flyable.demo'
// Bài 13: demo lớp trừu tượng Shape.
import './Shape.demo'
// Bài 14: demo Employee -> Manager, Developer.
import './Employee.demo'
// Bài 15: demo lớp Library.
import './Library.demo'
// Bài 16: demo lớp generic Box.
import './Box.demo'
// Bài 17: demo Singleton Logger.
import './Logger.demo'
// Bài 18: demo lớp static MathUtil.
import './MathUtil.demo'
// Bài 19: demo đa hình / ghi đè phương thức.
import './Polymorphism.demo'
// Bài 20: demo interface Vehicle.
import './Vehicle.demo'
// Bài 21: demo generic Repository.
import './Repository.demo'
// Bài 22: demo lớp Stack.
import './Stack.demo'
// Bài 23: demo interface Payment.
import './Payment.demo'
// Bài 24: demo lớp trừu tượng Appliance.
import './Appliance.demo'
// Bài 25: demo static method của lớp Shape.
import './ShapeStatic.demo'
// Bài 26: demo lớp Order.
import './Order.demo'
// Bài 27: demo lớp Teacher.
import './Teacher.demo'
// Bài 28: demo phương thức protected.
import './AnimalProtected.demo'
// Bài 29: demo interface Movable.
import './Movable.demo'
// Bài 30: demo lớp School.
import './School.demo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
