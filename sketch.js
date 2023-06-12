//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//aula 5.7
let chanceDeErrar = 0;
//fim aula 5.7

//sugestao forum monitora
let direcaoRaqueteOponente = 1;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete1frente();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  verificaColisaoRaquete2frente();
  incluiPlacar();
  marcaPonto();
  limiteRaquete();
  //sugestao forum monitora
  movimentaRaqueteOponenteZ();
  verificaColisaoRaquete1atras();
  verificaColisaoRaquete2atras();
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);
} 

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}  

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}


function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento &&
      yBolinha - raio < yRaquete + raqueteAltura &&
      yBolinha - raio > yRaquete + raqueteAltura)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete1frente(){
  colidiu =
  collideRectCircle((xRaquete + 10), yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    xBolinha = xRaquete + raqueteComprimento + 15
    raquetada.play();
   }
}

function verificaColisaoRaquete2frente(){
  colidiu =
  collideRectCircle((xRaqueteOponente), yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    xBolinha = xRaqueteOponente - 10
    raquetada.play();
   }
}


function verificaColisaoRaquete1atras(){
  colidiu =
  collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    xBolinha = xRaquete + raqueteComprimento + 15
    raquetada.play();
   }
}

function verificaColisaoRaquete2atras(){
  colidiu =
  collideRectCircle((xRaqueteOponente + 10), yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    xBolinha = xRaqueteOponente - 10
    raquetada.play();
   }
}


//aula 5.7
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >=39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
}
}
//fim aula 5.7

//sugestao forum monitora
function movimentaRaqueteOponenteZ (){
  const mediaYBolinha = yBolinha + raio;
  const mediaYRaqueteOponente = yRaqueteOponente + (raqueteAltura/2);
  if (mediaYBolinha > mediaYRaqueteOponente){
    direcaoRaqueteOponente = 1;
  }else{
    direcaoRaqueteOponente = -1;
  }
  yRaqueteOponente += 5 * random(0.55, 0.95) * direcaoRaqueteOponente;
}
//fim sugesao forum monitora
function limiteRaquete (){
  //Minha raquete
  if (yRaquete >= 310){
    yRaquete = 310;
} if (yRaquete <= 0){
  yRaquete = 0;
}
  //Raquete Oponente 
  //com mudança da monitora nao precisa limitar raquete oponente pois ela segue a bolinha que esta sempre no quadro
  //if (yRaqueteOponente >= 310){
   // yRaqueteOponente = 310;
//} if (yRaqueteOponente <= 0){
 // yRaqueteOponente = 0;
//}
}
//fim sugestões fórum

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play()
  }
}