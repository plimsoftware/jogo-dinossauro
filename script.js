const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const go = document.getElementById('GO');
const gameOver = document.getElementById('game-over');
const game = document.getElementById('wrapper');
const begin = document.getElementById('begin');
const classic = document.getElementById('classic');
const mario = document.getElementById('mario');


let isJumping = false;
let isGameOver = false;
let position = 130;
let theme = 'classic';

function handleKeyUp(event) {
    if (!isJumping) {
      jump();
    }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position <= 10) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position >= 130) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position += 10;
          dino.style.top = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position -=10;
      dino.style.top = position + 'px';
    }
  }, 20);
}

function start (){
  createCactus();
  go.removeEventListener('click', start);
}

function restart (){
  window.location.reload();
}

function setMario (){
  background.style.backgroundImage = "url('backgroundmario.png')";
  dino.style.backgroundImage = "url('mario.png')";
  theme = 'mario';
}

function setClassic (){
  background.style.backgroundImage = "url('background.png')";
  dino.style.backgroundImage = "url('dino.png')";
  theme = 'classic';
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 650;
  let randomTime = Math.random() * 6500;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  if (theme === 'mario') {
    cactus.style.backgroundImage = "url('badguy.png')";
  } else {
    cactus.style.backgroundImage = "url('cactus.png')";
  }
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < 0) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position > 70) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      wrapper.style.display = 'none';
      gameOver.style.display = 'flex';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

document.addEventListener('keydown', handleKeyUp);
background.addEventListener('click', handleKeyUp);
go.addEventListener('click', start);
begin.addEventListener('click', restart);
classic.addEventListener('click', setClassic);
mario.addEventListener('click', setMario);
