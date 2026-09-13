// Bài 11: Viết lại Bài 1 bằng async/await.

// Hàm delay: đóng gói setTimeout thành Promise để có thể await.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sayHello(): Promise<string> {
  await delay(2000); // dừng 2 giây, không chặn luồng chính
  return "Hello Async"; // async luôn tự bọc giá trị vào Promise
}

console.log("Bat dau, cho 2 giay...");
const message = await sayHello();
console.log("Ket qua:", message);
