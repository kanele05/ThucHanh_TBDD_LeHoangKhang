// Bài 26: Dùng async/await với setTimeout để chờ 5 giây.

// Bọc setTimeout vào Promise thì mới await được.
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("Bat dau:", new Date().toLocaleTimeString());
await sleep(5000);
console.log("Sau 5 giay:", new Date().toLocaleTimeString());
