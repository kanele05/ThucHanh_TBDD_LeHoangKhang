// Bài 25: Hàm downloadFile giả lập tải file trong 3 giây.

function downloadFile(fileName: string): Promise<string> {
  return new Promise((resolve) => {
    console.log(`Bat dau tai ${fileName}...`);
    setTimeout(() => resolve(`Da tai xong ${fileName}`), 3000);
  });
}

const msg = await downloadFile("baocao.pdf");
console.log(msg);
