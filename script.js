const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let GameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

//pegando o highscore do armazenamento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    //vai calcular um valor random de 0 até 30 pra comida ficar
    foodX = Math.floor(Math.random() * 30 /*tamanho do board*/) + 1;
    foodY = Math.floor(Math.random() * 30 /*tamanho do board*/) + 1;
}

const handleGameOver= () => {
    //limpando o timer e recarregando a página quando acaba o jogo
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();

}

const changeDirection = (e) => {
    //muda a velocidade a partir da tecla que foi pressionada
    if (e.key === "ArrowUp" && velocityY != 1 || e.key === "w" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1 || e.key === "s" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX != -1 || e.key === "d" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX != 1 || e.key === "a" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    initGame();
}

//criando uma div pra comida e outra pra cobra e colocando elas dentro do elemento do board
const initGame = () => {
    if (GameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //checando se a cobra tocou na comida
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);//empurrando a posição da comida pro array da cobra
        score++; // aumenta o score mais 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`; //muda html do score pro número certo
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        //tacando pra frente os valores dos elementos no corpo da cobra por um
        snakeBody[i] = snakeBody[i - 1];
       
    }

    snakeBody[0] = [snakeX, snakeY]; //primeiro elemento da cobra vai pra posição atual dela

    //faz a cobrinha se mover adicionando uma posição tanto no X quanto no Y dependendo da tecla pressionada
    snakeX += velocityX;
    snakeY += velocityY;

    //checando se a cobra saiu pra fora, se sim então seta GameOver pra true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        GameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //adicionando uma div pra cada parte do corpinho da cobra
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //chacando pra ver se a cabeça da cobra tocou no corpo, se sim então da GameOver
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            GameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup; 
}

//chamando as funções
changeFoodPosition();
setIntervalId = setInterval(initGame, 125); //a cobra vai se mover de 125 milissegundos em 125 milissegundos, é a velocidade

document.addEventListener("keydown", changeDirection)