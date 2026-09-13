// Bài 21: Dùng fetch lấy dữ liệu từ API công khai.

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

// fetch KHÔNG tự ném lỗi khi server trả 404/500 -> phải tự kiểm tra res.ok.
if (!res.ok) throw new Error(`HTTP ${res.status}`);

const todo = (await res.json()) as Todo; // .json() cũng bất đồng bộ
console.log("Todo:", todo);
