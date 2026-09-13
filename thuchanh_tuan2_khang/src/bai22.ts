// Bài 22: Gọi API nhiều lần và in kết quả.

type Todo = { id: number; title: string; completed: boolean };

async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Todo;
}

// Gọi song song 3 request cho nhanh.
const todos = await Promise.all([getTodo(1), getTodo(2), getTodo(3)]);

todos.forEach((t) => console.log(`#${t.id} | ${t.completed ? "DONE" : "TODO"} | ${t.title}`));
