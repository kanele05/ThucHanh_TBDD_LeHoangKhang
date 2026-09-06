// Chạy lần lượt cả 30 bài và in kết quả.
import { spawnSync } from "node:child_process";

for (let i = 1; i <= 30; i++) {
  const file = `src/bai${String(i).padStart(2, "0")}.ts`;
  console.log(`\n========== Bài ${i} (${file}) ==========`);
  spawnSync(process.execPath, [file], { stdio: "inherit" });
}
