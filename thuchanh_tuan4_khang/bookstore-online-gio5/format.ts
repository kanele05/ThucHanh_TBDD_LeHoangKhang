// Hàm tiện ích dùng chung cho các màn hình có hiển thị giá (Chi tiết sách, Giỏ hàng).
import { Book } from "./data";

export function formatPrice(value: number) {
  return `${value.toLocaleString()} đ`;
}

// Giá sau khi trừ % giảm giá (nếu có)
export function getFinalPrice(book: Book) {
  return book.discountPercent ? Math.round((book.price * (100 - book.discountPercent)) / 100) : book.price;
}
