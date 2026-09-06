// Bài 3: Promise bị reject với lỗi "Something went wrong" sau 1 giây.

function failAfter1s(): Promise<never> {
  return new Promise((_resolve, reject) => {
    // reject() nên truyền đối tượng Error để giữ được stack trace.
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

// Promise bị reject => rơi vào .catch(), không vào .then().
failAfter1s()
  .then(() => console.log("Khong bao gio chay vao day"))
  .catch((err: Error) => console.log("Loi:", err.message));
