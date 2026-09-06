// Bài 27: Hàm fetchWithRetry(url, retries) - thử lại tối đa `retries` lần khi lỗi.

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries: number): Promise<unknown> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log(`  Lan ${attempt}: thanh cong`);
      return res.json();
    } catch (err) {
      console.log(`  Lan ${attempt}: that bai (${(err as Error).message})`);
      if (attempt === retries) throw new Error(`Da thu ${retries} lan van loi`);
      await sleep(1000); // nghỉ 1 giây rồi thử lại
    }
  }
}

// URL hợp lệ -> thành công ngay lần 1.
console.log("URL dung:");
const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
console.log("  Du lieu:", data);

// URL sai -> thử đủ 3 lần rồi báo lỗi.
console.log("URL sai:");
try {
  await fetchWithRetry("https://khong-ton-tai-abc123.com/data", 3);
} catch (err) {
  console.log("  Ket qua cuoi:", (err as Error).message);
}
