// Bài 17: Dùng for await...of để duyệt một mảng các Promise.

function simulateTask(name: string, ms: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(name), ms));
}

// Các Promise được TẠO ngay tại đây nên chúng chạy song song từ đầu.
const tasks: Promise<string>[] = [
  simulateTask("Task A", 1500),
  simulateTask("Task B", 500),
  simulateTask("Task C", 1000),
];

// for await...of tự await từng phần tử, lấy kết quả theo ĐÚNG thứ tự mảng.
for await (const result of tasks) {
  console.log("Nhan duoc:", result);
}
