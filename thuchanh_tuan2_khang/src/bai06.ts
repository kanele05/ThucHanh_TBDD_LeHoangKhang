// Bài 6: Dùng Promise.all() chạy song song 3 Promise và in kết quả.

function simulateTask(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} xong sau ${time}ms`), time);
  });
}

console.time("Tong thoi gian");

// Promise.all chạy song song, trả về mảng kết quả đúng thứ tự truyền vào.
// Tổng thời gian = task lâu nhất (3000ms), không phải 1+2+3 giây.
const results = await Promise.all([
  simulateTask("Task A", 1000),
  simulateTask("Task B", 2000),
  simulateTask("Task C", 3000),
]);

console.log(results);
console.timeEnd("Tong thoi gian");
