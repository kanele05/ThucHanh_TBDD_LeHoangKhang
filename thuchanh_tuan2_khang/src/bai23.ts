// Bài 23: Lấy danh sách todo và loại bỏ những todo CHƯA hoàn thành.

type Todo = { id: number; title: string; completed: boolean };

async function getCompletedTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const todos = (await res.json()) as Todo[];
  return todos.filter((t) => t.completed); // chỉ giữ completed = true
}

const done = await getCompletedTodos();
console.log("So todo da hoan thanh:", done.length);
console.log("5 todo dau tien:");
done.slice(0, 5).forEach((t) => console.log(`  #${t.id} ${t.title}`));
