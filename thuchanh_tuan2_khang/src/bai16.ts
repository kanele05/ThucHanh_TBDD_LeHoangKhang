// Bài 16: Gọi nhiều hàm async SONG SONG bằng Promise.all().

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function step(name: string, ms: number): Promise<string> {
  await delay(ms);
  console.log(`  -> xong ${name}`);
  return name;
}

console.time("Tong thoi gian");

// Cả 3 khởi chạy cùng lúc => tổng thời gian ~ bước lâu nhất (1 giây).
const results = await Promise.all([
  step("Buoc 1", 1000),
  step("Buoc 2", 1000),
  step("Buoc 3", 1000),
]);

console.log("Ket qua:", results);
console.timeEnd("Tong thoi gian");
