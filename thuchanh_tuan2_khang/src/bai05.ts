// Bài 5: Hàm simulateTask(time) trả về "Task done" sau time mili-giây.

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done sau ${time}ms`), time);
  });
}

// Gọi thử với 1500ms.
simulateTask(1500).then((result) => console.log(result));
