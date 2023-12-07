// Constants
const canvas = document.getElementById('canvas'); // Get the canvas element from the DOM
const context = canvas.getContext('2d'); // Get the 2D rendering context
const width = canvas.width; // Canvas width
const height = canvas.height; // Canvas height
const paddleWidth = 10; // Width of the paddles
const paddleHeight = 100; // Height of the paddles
const ballRadius = 5; // Radius of the ball

// Game variables
let player1Score = 0; // Player 1's score
let player2Score = 0; // Player 2's score
let ballX = width / 2; // Ball's X position
let ballY = height / 2; // Ball's Y position
let ballSpeedX = 2; // Ball's X velocity
let ballSpeedY = 2; // Ball's Y velocity
let player1Y = height / 2 - paddleHeight / 2; // Player 1's paddle Y position
let player2Y = height / 2 - paddleHeight / 2; // Player 2's paddle Y position

// Helper functions

// Draw a rectangle on the canvas
function drawRect(x, y, w, h, color) {
	context.fillStyle = color;
	context.fillRect(x, y, w, h);
}

// Draw a circle on the canvas
function drawCircle(x, y, r, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.fill();
}

// Draw text on the canvas
function drawText(text, x, y, color) {
	context.fillStyle = color;
	context.font = "30px Arial";
	context.fillText(text, x, y);
}

// Reset the game state
function reset() {
	ballX = width / 2;
	ballY = height / 2;
	ballSpeedX = -ballSpeedX;
	ballSpeedY = 5;
}

// Handle collision detection
function collisionDetection() {
	// Check collision with player 1's paddle
	if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
		ballSpeedX = -ballSpeedX;
		let deltaY = ballY - (player1Y + paddleHeight / 2);
		ballSpeedY = deltaY * 0.35;
	}

	// Check collision with player 2's paddle
	if (ballX + ballRadius > width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
		ballSpeedX = -ballSpeedX;
		let deltaY = ballY - (player2Y + paddleHeight / 2);
		ballSpeedY = deltaY * 0.35;
	}

	// Check collision with top and bottom walls
	if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
		ballSpeedY = -ballSpeedY;
	}

	// Check if ball went out of bounds
	if (ballX < 0) {
		player2Score++;
		reset();
	} else if (ballX > width) {
		player1Score++;
		reset();
	}
}

// Update the game state
function update() {
	// Move player 1's paddle
	if (upPressed) {
		player1Y -= 5;
	} else if (downPressed) {
		player1Y += 5;
	}

	// Move player 2's paddle
	if (wPressed) {
		player2Y -= 5;
	} else if (sPressed) {
		player2Y += 5;
	}

	// Update ball position
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Perform collision detection
	collisionDetection();

	// Draw the game elements
	drawRect(0, 0, width, height, '#eee'); // Draw the background
	drawRect(0, player1Y, paddleWidth, paddleHeight, 'black'); // Draw player 1's paddle
	drawRect(width - paddleWidth, player2Y, paddleWidth, paddleHeight, 'black'); // Draw player 2's paddle
	drawCircle(ballX, ballY, ballRadius, 'black'); // Draw the ball
	drawText(player1Score, width / 4, 50, 'black'); // Draw player 1's score
	drawText(player2Score, 3 * width / 4, 50, 'black'); // Draw player 2's score
}

// Event listeners
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

// Keydown event listener
document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowUp') {
		upPressed = true;
	} else if (event.key === 'ArrowDown') {
		downPressed = true;
	} else if (event.key === 'w') {
		wPressed = true;
	} else if (event.key === 's') {
		sPressed = true;
	}
});

// Keyup event listener
document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowUp') {
		upPressed = false;
	} else if (event.key === 'ArrowDown') {
		downPressed = false;
	} else if (event.key === 'w') {
		wPressed = false;
	} else if (event.key === 's') {
		sPressed = false;
	}
});

// Game loop
function gameLoop() {
	update();
	requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
