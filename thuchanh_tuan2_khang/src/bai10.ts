// Bài 10: Dùng .finally() để log "Done" dù thành công hay thất bại.

function task(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("That bai"));
      else resolve("Thanh cong");
    }, 500);
  });
}

// Trường hợp thành công.
task(false)
  .then((r) => console.log("[1] then:", r))
  .catch((e: Error) => console.log("[1] catch:", e.message))
  .finally(() => console.log("[1] Done")); // luôn chạy cuối cùng

// Trường hợp thất bại.
task(true)
  .then((r) => console.log("[2] then:", r))
  .catch((e: Error) => console.log("[2] catch:", e.message))
  .finally(() => console.log("[2] Done"));
