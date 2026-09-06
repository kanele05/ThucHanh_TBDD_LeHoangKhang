// Bài 15: Gọi nhiều hàm async TUẦN TỰ bằng await.

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function step(name: string, ms: number): Promise<string> {
  await delay(ms);
  console.log(`  -> xong ${name}`);
  return name;
}

console.time("Tong thoi gian");

// Mỗi await chờ bước trước xong mới chạy bước sau => tổng = 1+1+1 = 3 giây.
const a = await step("Buoc 1", 1000);
const b = await step("Buoc 2", 1000);
const c = await step("Buoc 3", 1000);

console.log("Thu tu hoan thanh:", [a, b, c]);
console.timeEnd("Tong thoi gian");
