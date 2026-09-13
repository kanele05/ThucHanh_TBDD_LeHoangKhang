// Bài 13: Xử lý lỗi bằng try/catch với async/await.

function riskyTask(): Promise<string> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error("Server khong phan hoi")), 1000);
  });
}

async function run(): Promise<void> {
  try {
    const data = await riskyTask(); // Promise reject => nhảy xuống catch
    console.log("Du lieu:", data);
  } catch (err) {
    console.log("Bat duoc loi:", (err as Error).message);
  } finally {
    console.log("Ket thuc ham run()"); // luôn chạy
  }
}

await run();
