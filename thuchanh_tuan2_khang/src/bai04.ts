// Bài 4: Dùng .then() và .catch() xử lý Promise trả về số ngẫu nhiên.

function randomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random(); // số ngẫu nhiên trong [0, 1)
      // Quy ước: >= 0.5 là thành công, < 0.5 là thất bại.
      if (n >= 0.5) resolve(n);
      else reject(new Error(`So qua nho: ${n.toFixed(3)}`));
    }, 1000);
  });
}

randomNumber()
  .then((n) => console.log("Thanh cong, so =", n.toFixed(3)))
  .catch((err: Error) => console.log("That bai:", err.message));
