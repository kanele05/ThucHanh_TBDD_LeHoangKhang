// Bài 8: Chuỗi Promise: bình phương 2 -> nhân đôi -> cộng 5.

function square(n: number): Promise<number> {
  return Promise.resolve(n * n);
}

// Mỗi .then() trả về giá trị -> tự động bọc thành Promise cho .then() kế tiếp.
square(2)
  .then((n) => {
    console.log("Binh phuong:", n); // 4
    return n * 2;
  })
  .then((n) => {
    console.log("Nhan doi:", n); // 8
    return n + 5;
  })
  .then((n) => console.log("Cong 5:", n)); // 13
