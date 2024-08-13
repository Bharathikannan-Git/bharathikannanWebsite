const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
let score = 0;
let ballSpeed = 3;
let ballDirection = 1;

document.addEventListener('mousemove', movePaddle);

function movePaddle(event) {
    const gameContainer = document.querySelector('.game-container');
    const containerRect = gameContainer.getBoundingClientRect();
    const paddleWidth = paddle.offsetWidth;
    let paddleX = event.clientX - containerRect.left - (paddleWidth / 2);

    // Prevent the paddle from going out of bounds
    if (paddleX < 0) paddleX = 0;
    if (paddleX > containerRect.width - paddleWidth) paddleX = containerRect.width - paddleWidth;

    paddle.style.left = paddleX + 'px';
}

function moveBall() {
    const ballRect = ball.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();
    const gameContainer = document.querySelector('.game-container');
    const containerRect = gameContainer.getBoundingClientRect();

    let newTop = ballRect.top + ballSpeed * ballDirection;

    // Ball hits the top of the container
    if (newTop < containerRect.top) {
        ballDirection *= -1;
    }

    // Ball hits the paddle
    if (newTop + ballRect.height > paddleRect.top &&
        ballRect.left + ballRect.width > paddleRect.left &&
        ballRect.left < paddleRect.right) {
        ballDirection *= -1;
        score += 1;
        scoreDisplay.textContent = score;
        ballSpeed += 0.5; // Increase speed slightly
    }

    // Ball hits the bottom of the container (game over)
    if (newTop + ballRect.height > containerRect.bottom) {
        alert(`Game Over! Your final score is ${score}`);
        score = 0;
        ballSpeed = 3;
        scoreDisplay.textContent = score;
        resetBall();
    }

    ball.style.top = newTop + 'px';
}

function resetBall() {
    ball.style.top = '0';
    ballDirection = 1;
}

setInterval(moveBall, 20);
