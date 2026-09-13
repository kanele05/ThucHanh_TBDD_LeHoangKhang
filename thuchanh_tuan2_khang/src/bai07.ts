// Bài 7: Dùng Promise.race() lấy Promise nào hoàn thành trước.

function simulateTask(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} (${time}ms)`), time);
  });
}

// Promise.race trả về kết quả của Promise settle ĐẦU TIÊN, bỏ qua phần còn lại.
const winner = await Promise.race([
  simulateTask("Cham", 3000),
  simulateTask("Nhanh", 500),
  simulateTask("Trung binh", 1500),
]);

console.log("Ve dich truoc:", winner);
