// Bài 28: Hàm batchProcess() xử lý 5 task cùng lúc bằng Promise.all.

function task(id: number): Promise<string> {
  const ms = 500 * id;
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task ${id} xong (${ms}ms)`), ms);
  });
}

async function batchProcess(): Promise<string[]> {
  const jobs = [1, 2, 3, 4, 5].map((id) => task(id)); // tạo 5 Promise
  return Promise.all(jobs); // chờ cả 5 cùng hoàn thành
}

console.time("Batch");
const results = await batchProcess();
results.forEach((r) => console.log(r));
console.timeEnd("Batch"); // ~2500ms = task lâu nhất
