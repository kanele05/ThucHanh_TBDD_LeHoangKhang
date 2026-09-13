// Bài 18: Hàm fetchUser(id) giả lập gọi API, trả về user sau 1 giây.

// Định nghĩa kiểu dữ liệu cho user.
type User = {
  id: number;
  name: string;
  email: string;
};

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error("ID khong hop le"));
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
    }, 1000);
  });
}

console.log("Dang goi API...");
const user = await fetchUser(1);
console.log("User:", user);
