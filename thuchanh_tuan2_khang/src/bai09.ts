// Bài 9: Promise đọc một mảng sau 1 giây rồi lọc ra số chẵn.

function readArray(): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 1000);
  });
}

readArray()
  .then((arr) => {
    console.log("Mang goc:", arr);
    return arr.filter((n) => n % 2 === 0); // giữ lại phần tử chia hết cho 2
  })
  .then((evens) => console.log("So chan:", evens));
