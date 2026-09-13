// Bài 2: Hàm trả về Promise resolve số 10 sau 1 giây.

// Kiểu trả về Promise<number> => .then() sẽ nhận được number.
function getNumber(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

console.log("Dang lay so...");
getNumber().then((n) => console.log("Nhan duoc:", n));
