const gif = document.getElementById('gif');
const question = document.getElementById('question');
const btnContainer = document.getElementById('btnContainer');
let yesBtnSize = 18;
let noCount = 0;

// Giữ lại duy nhất 1 GIF đầu tiên
let firstGif = "https://media.tenor.com/76BaX0eo304AAAAj/kitty-kitty-heart.gif";

// Các thông điệp khi chọn sai
let questions = [
  "Suy nghĩ lại chưa nè?",
  "Thật sự chọn sai luôn hả?",
  "Thử lại lần nữa xem...",
  "Đâu phải con gà đâu!",
  "Chọn lại đi mà...",
  "Nhấn vào Nhịp đập! đi mà"
];

function initButtons() {
  btnContainer.innerHTML = `
    <button class="btn yes" id="yesBtn">Nhịp đập!</button>
    <button class="btn no" id="noBtn">Con gà</button>
  `;
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  yesBtn.addEventListener('click', () => yesClick());
  noBtn.addEventListener('click', () => noClick(yesBtn, noBtn));
}

function resetPage() {
  noCount = 0;
  yesBtnSize = 18;
  question.textContent = "Pulse! nghĩa là gì?";
  gif.src = firstGif;
  gif.style.display = "inline-block"; // Hiển thị lại GIF khi reset
  
  // Xóa video cũ nếu có
  const oldVideo = document.getElementById('myVideo');
  if (oldVideo) oldVideo.remove();

  gif.onerror = function() {
    gif.src = firstGif;
  };
  initButtons();
}

function yesClick() {
  question.textContent = "Đúng rồi! Chính xác luôn 💗";
  btnContainer.innerHTML = "";
  
  // Ẩn ảnh GIF
  gif.style.display = "none";

  // Tạo thẻ video mới phát file video.mp4
  const video = document.createElement('video');
  video.id = "myVideo";
  video.src = "video12345.mp4"; // Đường dẫn file video nội bộ
  video.autoplay = true;
  video.controls = true;
  video.loop = true;
  video.style.maxWidth = "450px";
  video.style.borderRadius = "12px";

  // Chèn video vào vị trí bên dưới câu hỏi
  question.after(video);
}

function noClick(yesBtn, noBtn) {
  yesBtnSize += 15;
  yesBtn.style.fontSize = yesBtnSize + 'px';
  noCount++;

  // Giữ nguyên gif đầu tiên, không thay đổi gif khác
  gif.src = firstGif;

  let qIndex = (noCount - 1) % questions.length;
  question.textContent = questions[qIndex];

  yesBtn.textContent = "Nhịp đập!";

  if (!document.getElementById('noBtn')) {
    const newNoBtn = document.createElement('button');
    newNoBtn.className = 'btn no';
    newNoBtn.id = 'noBtn';
    newNoBtn.textContent = 'Con gà';
    btnContainer.appendChild(newNoBtn);
    newNoBtn.addEventListener('click', () => noClick(yesBtn, newNoBtn));
  }

}

resetPage();