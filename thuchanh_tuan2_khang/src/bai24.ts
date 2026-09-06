// Bài 24: Hàm postData() gửi request POST tới API test.

type NewPost = { title: string; body: string; userId: number };

async function postData(data: NewPost): Promise<unknown> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // báo server biết body là JSON
    body: JSON.stringify(data), // object -> chuỗi JSON
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const created = await postData({ title: "Hoc Async", body: "TypeScript", userId: 1 });
console.log("Server tra ve:", created);
