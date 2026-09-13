// Bài 12: Hàm async gọi simulateTask(2000) và in kết quả.

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done sau ${time}ms`), time);
  });
}

async function runTask(): Promise<void> {
  console.log("Dang chay task...");
  const result = await simulateTask(2000); // chờ Promise resolve rồi lấy giá trị
  console.log("Ket qua:", result);
}

await runTask();
