const fps = 24;
let jogoRodando = false;

const pontuacao = document.querySelector("#pontuacao");

const orientacao = document.querySelector(".comandos");

const tela = document.querySelector("#tela");
const telaTamanhoBloco = 8;
const telaTotalQuadradosLargura = 40;
const telaTotalQuadradosAltura = 60;

const pontos = [0, 0];

const bolinha = document.querySelector("#bolinha");
let bolinhaVelocidade = 1;
let bolinhaDirecaoY = bolinhaVelocidade;
let bolinhaDirecaoX = bolinhaVelocidade;
const bolinhaTamanho = 2;
//const bolinhaPosicao = [0, 0];
const bolinhaPosicaoInicial = [
  telaTotalQuadradosLargura / 2 - bolinhaTamanho / 2,
  telaTotalQuadradosAltura / 4 - bolinhaTamanho / 2,
];
const bolinhaPosicao = Array.from(bolinhaPosicaoInicial);

class jogador {
  constructor(objeto, tamanhoX, tamanhoY, posicaoX, posicaoY) {
    this.objeto = objeto;
    this.tamanhoX = tamanhoX;
    this.tamanhoY = tamanhoY;
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
  }
}

const jogador1 = new jogador(document.querySelector("#jogador1"), 16, 2);
jogador1.posicaoX = telaTotalQuadradosLargura / 2 - jogador1.tamanhoX / 2;
jogador1.posicaoY = telaTotalQuadradosAltura - jogador1.tamanhoY - 1;

const jogador2 = new jogador(document.querySelector("#jogador2"), 16, 2);
jogador2.posicaoX = telaTotalQuadradosLargura / 2 - jogador2.tamanhoX / 2;
jogador2.posicaoY = jogador2.tamanhoY;

function desenhaPontuacao() {
  const spanPontos = pontuacao.querySelectorAll("span");
  spanPontos[0].innerText = pontos[0];
  spanPontos[1].innerText = pontos[1];
}

function desenhaTela() {
  if (jogoRodando == true) {
    orientacao.style.display = "none";
  } else {
    orientacao.style.display = "block";
  }
  tela.style.gridTemplateColumns = `Repeat(${telaTotalQuadradosLargura}, ${telaTamanhoBloco}px)`;
  tela.style.gridTemplateRows = `Repeat(${telaTotalQuadradosAltura}, ${telaTamanhoBloco}px)`;
}

function desenhaBolinha() {
  bolinha.style.width = telaTamanhoBloco * bolinhaTamanho + "px";
  bolinha.style.height = telaTamanhoBloco * bolinhaTamanho + "px";

  bolinha.style.gridColumn = bolinhaPosicao[0];
  bolinha.style.gridRow = bolinhaPosicao[1];
}

function desenhaJogador(jogador) {
  jogador.objeto.style.width = telaTamanhoBloco * jogador.tamanhoX + "px";
  jogador.objeto.style.height = telaTamanhoBloco * jogador.tamanhoY + "px";

  jogador.objeto.style.gridColumn = jogador.posicaoX;
  jogador.objeto.style.gridRow = jogador.posicaoY;
}

function direcaoAleatoria() {
  return Math.round(Math.random()) * 1;
}

function checaColisao() {
  let bolinhaPosX = bolinhaPosicao[0] + bolinhaTamanho / 2;

  if (bolinhaPosicao[1] >= telaTotalQuadradosAltura) {
    bolinhaPosicao[0] = bolinhaPosicaoInicial[0];
    bolinhaPosicao[1] = bolinhaPosicaoInicial[1];
    bolinhaDirecaoY = -bolinhaDirecaoY;

    pontos[1] = pontos[1] + 1; //jogador2 ganhou
    //jogoRodando = false;
  } else if (bolinhaPosicao[1] <= 0) {
    bolinhaPosicao[0] = bolinhaPosicaoInicial[0];
    bolinhaPosicao[1] = bolinhaPosicaoInicial[1];
    bolinhaDirecaoY = -bolinhaDirecaoY;

    pontos[0] = pontos[0] + 1; //jogador1 ganhou

    //jogoRodando = false;
  } else {
    if (bolinhaPosicao[1] + bolinhaTamanho == jogador1.posicaoY) {
      if (
        bolinhaPosX >= jogador1.posicaoX &&
        bolinhaPosX <= jogador1.posicaoX + jogador1.tamanhoX
      ) {
        //console.log("colidiu com o jogador 1");
        bolinhaDirecaoY = -bolinhaDirecaoY;
        if (direcaoAleatoria == 1) {
          bolinhaDirecaoX = -bolinhaDirecaoX;
        }
      }
    }

    if (bolinhaPosicao[1] - bolinhaTamanho == jogador2.posicaoY) {
      if (
        bolinhaPosX >= jogador2.posicaoX &&
        bolinhaPosX <= jogador2.posicaoX + jogador2.tamanhoX
      ) {
        //console.log("colidiu com o jogador 2");
        bolinhaDirecaoY = -bolinhaDirecaoY;

        if (direcaoAleatoria == 1) {
          bolinhaDirecaoX = -bolinhaDirecaoX;
        }
      }
    }

    if (bolinhaPosX >= telaTotalQuadradosLargura) {
      bolinhaDirecaoX = -bolinhaDirecaoX;
    } else if (bolinhaPosX <= 2) {
      bolinhaDirecaoX = -bolinhaDirecaoX;
    }
  }
}

function moveBolinha() {
  //console.log(direcaoAleatoria());

  bolinhaPosicao[0] = bolinhaPosicao[0] + bolinhaDirecaoX;
  bolinhaPosicao[1] = bolinhaPosicao[1] + bolinhaDirecaoY;
}

function moveJogador(jogador, direcao) {
  if (jogoRodando == true) {
    if (direcao === "esquerda") {
      jogador.posicaoX = jogador.posicaoX - 1;
    } else if (direcao === "direita") {
      jogador.posicaoX = jogador.posicaoX + 1;
    }

    if (jogador.posicaoX <= 1) {
      jogador.posicaoX = 1;
    }

    if (jogador.posicaoX >= telaTotalQuadradosLargura - jogador.tamanhoX + 1) {
      jogador.posicaoX = telaTotalQuadradosLargura - jogador.tamanhoX + 1;
    }
  }
}

function lidaComEntrada(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveJogador(jogador1, "esquerda");
      // moveJogador(jogador2, "esquerda", jogador2Posicao, jogador2TamanhoX);
      break;
    case "ArrowRight":
      moveJogador(jogador1, "direita");
      //moveJogador(jogador2, "direita", jogador2Posicao, jogador2TamanhoX);
      break;

    case "a":
    case "A":
      moveJogador(jogador2, "esquerda");
      break;
    case "d":
    case "D":
      moveJogador(jogador2, "direita");
      break;
    case "p":
    case "P":
      jogoRodando = jogoRodando ? false : true;
      break;
  }
}
document.addEventListener("keydown", lidaComEntrada);

setInterval(() => {
  desenhaTela();
  if (jogoRodando == true) {
    desenhaPontuacao();
    desenhaBolinha();
    desenhaJogador(jogador1);
    desenhaJogador(jogador2);

    moveBolinha();

    checaColisao();
  }
}, 1000 / fps);
