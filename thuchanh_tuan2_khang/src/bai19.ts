// Bài 19: Hàm fetchUsers(ids) gọi fetchUser cho từng ID.

type User = { id: number; name: string };

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 1000);
  });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
  // map tạo mảng Promise, Promise.all chờ tất cả xong (chạy song song).
  return Promise.all(ids.map((id) => fetchUser(id)));
}

console.time("Thoi gian");
const users = await fetchUsers([1, 2, 3, 4]);
console.log(users);
console.timeEnd("Thoi gian"); // ~1 giây vì chạy song song
