const ballList = document.querySelector('#ball-list');
const colorGame = document.querySelector('#rgb-color');
const resetButton = document.querySelector('#reset-game');
const scoreBox = document.querySelector('#score');
scoreBox.innerHTML = 0;

function generateColor() {
  return Math.ceil(Math.random() * 255);
}

function addScore() {
  const scoreToAdd = parseInt(document.querySelector('#score').innerHTML, 0);
  const points = scoreToAdd + 3;
  scoreBox.innerHTML = points;
}

function removeListeners() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach((ball) => {
    const oldE = ball;
    const newE = ball.cloneNode(true);
    oldE.parentNode.replaceChild(newE, oldE);
  });
}

function checkAnswer(event) {
  const answerBox = document.querySelector('#answer');
  const { target } = event;
  if (target.id === 'correct') {
    answerBox.innerHTML = 'Acertou!';
    addScore();
    removeListeners();
  } else {
    answerBox.innerHTML = 'Errou! Tente novamente!';
    removeListeners();
  }
}

function setColors() {
  const answerBall = Math.floor(Math.random() * 6);
  for (let i = 0; i <= 5; i += 1) {
    const color1 = generateColor();
    const color2 = generateColor();
    const color3 = generateColor();
    const createBall = document.createElement('div');
    createBall.classList.add('ball');
    createBall.style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
    createBall.addEventListener('click', checkAnswer);
    if (i === answerBall) {
      colorGame.innerHTML = `(${color1}, ${color2}, ${color3})`;
      createBall.id = 'correct';
    }
    ballList.appendChild(createBall);
  }
}

function resetGame() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach((ball) => {
    ball.remove();
  });
  setColors();
  const answerBox = document.querySelector('#answer');
  answerBox.innerHTML = 'Escolha uma cor';
}

setColors();
resetButton.addEventListener('click', resetGame);
