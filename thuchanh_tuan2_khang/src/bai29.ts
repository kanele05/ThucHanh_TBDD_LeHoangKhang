// Bài 29: Hàm queueProcess() xử lý các task TUẦN TỰ theo hàng đợi.

function task(id: number): Promise<string> {
  const ms = 500;
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task ${id} xong`), ms);
  });
}

async function queueProcess(ids: number[]): Promise<string[]> {
  const results: string[] = [];
  // Vòng lặp for...of + await: task sau chỉ chạy khi task trước kết thúc.
  for (const id of ids) {
    const r = await task(id);
    console.log(`  ${r}`);
    results.push(r);
  }
  return results;
}

console.time("Queue");
const done = await queueProcess([1, 2, 3, 4, 5]);
console.log("Tong cong:", done.length, "task");
console.timeEnd("Queue"); // ~2500ms = 5 x 500ms
