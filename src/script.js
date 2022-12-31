const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let dinoPosition = 0;

function handleKeyUp(event){
    if (event.keyCode === 32){
        if (!isJumping){
            jump();
        }        
    }
}

function jump(){    
    isJumping = true;

    let upInterval = setInterval(() =>{        
        if (dinoPosition >= 150) {
            // descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + 'px';
                }                
            }, 20);
        } else {
            // subindo
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + 'px';
        }
    },20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomtime = Math.random() * 6000;

    if (isGameOver) return;
    
    cactus.classList.add('cactus');    
    background.appendChild(cactus);
    cactus.style.left = 100 + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            // saiu da tela
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
            // game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20);

    setTimeout(createCactus, randomtime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);