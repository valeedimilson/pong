let jogoRodando = true;
const fps = 24;

const tela = document.querySelector("#tela");
const telaWidth = 400;
const telaHeight = 400;
const telaTamanhoBloco = 10;
const telaWidthQuantidadeBloco = telaWidth / telaTamanhoBloco;
const telaHeightQuantidadeBloco = telaHeight / telaTamanhoBloco;

tela.style.display = "grid";
tela.style.backgroundColor = "darkgrey";
tela.style.border = "1px solid black";
tela.style.gridTemplateColumns = `repeat(${telaWidthQuantidadeBloco}, ${telaTamanhoBloco}px`;
tela.style.gridTemplateRows = `repeat(${telaHeightQuantidadeBloco}, ${telaTamanhoBloco}px`;

const bolinha = document.querySelector("#bolinha");
const bolinhaTamanho = 20;
let bolinhaPosX = 0;
let bolinhaPosY = 0;

bolinha.style.backgroundColor = "black";
bolinha.style.borderRadius = "100%";
bolinha.style.width = `${bolinhaTamanho}px`;
bolinha.style.height = `${bolinhaTamanho}px`;

let jogador1TamX = 100;
let jogador1TamY = 20;

let jogador1PosicaoX =
  telaWidthQuantidadeBloco / 2 - jogador1TamX / 2 / telaTamanhoBloco;
let jogador1PosicaoY = telaWidthQuantidadeBloco - 2;

console.log(jogador1PosicaoX);

const jogador1 = document.querySelector("#jogador1");
jogador1.style.backgroundColor = "black";
jogador1.style.width = `${jogador1TamX}px`;
jogador1.style.height = `${jogador1TamY}px`;
jogador1.style.gridColumn = jogador1PosicaoX;
jogador1.style.gridRow = jogador1PosicaoY;

function moveBolinha() {
  if (bolinhaPosX == telaHeightQuantidadeBloco - 1) {
    //jogoRodando = false;
    bolinhaPosX = 0;
    bolinhaPosY = 0;
    //console.log("perdeu");
  } else {
    bolinhaPosX++;
    bolinhaPosY++;
  }
  bolinha.style.gridColumn = bolinhaPosX;
  bolinha.style.gridRow = bolinhaPosY;
}

function desenhaJogador() {
  document.querySelector("#jogador1").style.gridColumn = jogador1PosicaoX;
}

function moveJogador(direcao) {
  if (direcao == "esquerda") {
    jogador1PosicaoX--;
  } else if (direcao == "direita") {
    jogador1PosicaoX++;
  }

  if (jogador1PosicaoX <= 1) {
    jogador1PosicaoX = 1;
  }

  if (
    jogador1PosicaoX >=
    telaWidthQuantidadeBloco - jogador1TamX / telaTamanhoBloco + 1
  ) {
    jogador1PosicaoX =
      telaWidthQuantidadeBloco - jogador1TamX / telaTamanhoBloco + 1;
  }
  console.log(`x: ${jogador1PosicaoX}`);
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveJogador("jogador1", "esquerda");
      break;
    case "ArrowRight":
      moveJogador("jogador1", "direita");
      break;
  }
}
document.addEventListener("keydown", handleKeyPress);

function loop() {
  if (jogoRodando == true) {
    moveBolinha();
    desenhaJogador();
    setTimeout(loop, 1000 / fps);
    //console.log("jogo rodando");
  }
}

loop(); // inicia loop do jogo
