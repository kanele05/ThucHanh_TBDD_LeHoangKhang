// Bài 20: Thêm timeout - nếu API chạy quá 2 giây thì ném lỗi.

function fetchUser(id: number, ms: number): Promise<{ id: number }> {
  return new Promise((resolve) => setTimeout(() => resolve({ id }), ms));
}

// Promise chỉ để đếm giờ: hết hạn thì reject.
function timeout(ms: number): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(`Timeout sau ${ms}ms`)), ms);
  });
}

// race: ai xong trước thắng -> API chậm hơn timeout sẽ bị hủy bằng lỗi.
async function fetchWithTimeout(id: number, apiMs: number): Promise<void> {
  try {
    const user = await Promise.race([fetchUser(id, apiMs), timeout(2000)]);
    console.log(`API ${apiMs}ms -> OK:`, user);
  } catch (err) {
    console.log(`API ${apiMs}ms -> Loi:`, (err as Error).message);
  }
}

await fetchWithTimeout(1, 1000); // kịp -> OK
await fetchWithTimeout(2, 3000); // quá hạn -> Timeout
