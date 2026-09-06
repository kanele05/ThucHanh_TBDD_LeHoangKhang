// Bài 14: Hàm async nhận 1 số, đợi 1 giây, trả về số đó × 3.

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tripleAfter1s(n: number): Promise<number> {
  await delay(1000);
  return n * 3;
}

console.log("Dang tinh 7 x 3...");
console.log("Ket qua:", await tripleAfter1s(7)); // 21
