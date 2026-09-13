// Bài 30: Dùng async/await + Promise.allSettled() để xem trạng thái từng request.

async function callApi(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const urls = [
  "https://jsonplaceholder.typicode.com/todos/1", // OK
  "https://jsonplaceholder.typicode.com/todos/2", // OK
  "https://jsonplaceholder.typicode.com/invalid-path/999", // 404
  "https://khong-ton-tai-abc123.com/data", // sai tên miền
];

// Khác Promise.all: allSettled KHÔNG dừng khi có lỗi, luôn chờ đủ mọi Promise.
const results = await Promise.allSettled(urls.map((u) => callApi(u)));

results.forEach((r, i) => {
  if (r.status === "fulfilled") {
    console.log(`[${i + 1}] THANH CONG:`, JSON.stringify(r.value).slice(0, 60));
  } else {
    console.log(`[${i + 1}] THAT BAI:`, (r.reason as Error).message);
  }
});
