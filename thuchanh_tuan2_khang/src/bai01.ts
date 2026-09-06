// Bài 1: Tạo Promise trả về chuỗi "Hello Async" sau 2 giây.

// Promise nhận callback (resolve, reject); setTimeout hẹn 2000ms rồi gọi resolve.
const helloPromise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

console.log("Bat dau, cho 2 giay...");

// .then() nhận giá trị mà resolve() truyền ra.
helloPromise.then((message) => console.log("Ket qua:", message));
