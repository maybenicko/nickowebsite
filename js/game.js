const canvas = document.getElementById("gameCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // Ball
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2); // random speed/direction
  let dy = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2);
  const ballRadius = 10;

  // Paddle
  const paddleHeight = 10;
  const paddleWidth = 80;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;

  // Score
  let score = 0;
  let highScore = 0;
  let gameOver = false;

  // Controls
  document.addEventListener("keydown", e => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
  });
  document.addEventListener("keyup", e => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
  });

  // Draw ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#6a0dad";
    ctx.fill();
    ctx.closePath();
  }

  // Draw paddle
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = "#f7f7f7";
    ctx.fill();
    ctx.closePath();
  }

  // Draw text (instructions, score)
  function drawInfo() {
    ctx.fillStyle = "#f7f7f7";
    ctx.font = "16px monospace";
    ctx.fillText("USE ⬅ ➡ ARROWS", 20, 30);

    ctx.fillText("SCORE: " + score, canvas.width - 130, 30);
    ctx.fillText("BEST: " + highScore, canvas.width - 130, 55);
  }

  // Draw Game Over screen
  function drawGameOver() {
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f7f7f7";
    ctx.font = "28px monospace";
    ctx.textAlign = "center";
    ctx.fillText("YOU LOST!", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("SCORE: " + score, canvas.width / 2, canvas.height / 2 + 20);

    ctx.font = "18px monospace";
    ctx.fillStyle = "#6a0dad";
    ctx.fillText("PRESS SPACE TO REPLAY", canvas.width / 2, canvas.height / 2 + 60);

    ctx.textAlign = "start"; // reset for other text
  }

  // Reset game
  function resetGame() {
    x = canvas.width / 2;
    y = canvas.height / 2;

    // Randomize direction + speed (2 to 4)
    const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;
    dx = dirX * (2 + Math.random() * 2);
    dy = dirY * (2 + Math.random() * 2);

    paddleX = (canvas.width - paddleWidth) / 2;
    if (score > highScore) highScore = score;
    score = 0;
    gameOver = false;
    draw();
  }

  document.addEventListener("keydown", e => {
    if (e.code === "Space" && gameOver) {
      resetGame();
    }
  });

  // Main draw loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
      drawGameOver();
      return;
    }

    drawBall();
    drawPaddle();
    drawInfo();

    // Bounce logic
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius - paddleHeight - 10) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -(dy + 0.3); // bounce faster
        dx += (Math.random() - 0.5) * 0.6; // add randomness sideways
        score++;
      } else {
        gameOver = true;
      }
    }

    x += dx;
    y += dy;

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 5;
    else if (leftPressed && paddleX > 0) paddleX -= 5;

    requestAnimationFrame(draw);
  }

  draw();
}
