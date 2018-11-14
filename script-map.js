var fita = new Map();
const qtdQuadrado = 25;
const centro = 660;

function init(){
	carregar();
	renderFita();
	renderTriangulo();
}

function carregar(){
	let texto = document.getElementById('tam1').value;
	let textoSplit = texto.split('');
	let posicao = centro;
    for(let i=0; i<texto.length; i++, posicao+=45){
		fita.set(posicao, textoSplit[i]);
    }
	renderFita();
}
function renderFita(){

	let canvasFita = document.getElementById('fita');
    let context = canvasFita.getContext('2d');
	context.clearRect(0, 0, canvasFita.width, canvasFita.height)
    context.beginPath();
    let x = 210;
    let y = 7;
	let tamanhoFita = qtdQuadrado * 45;
    context.font = '25px Calibri';
    var aux = x;
    for(x; x<tamanhoFita; x+=45){
		context.rect(x, y, 40, 40);
		let letra = fita.get(x);
		if(letra){
			context.strokeText(letra, x+14, 34);
		}
   }
   context.stroke();
}
function moverEsquerda(){
		let posicoes = Array.from(fita.keys());
		
		posicoes.sort(function comparar(a, b) {
		  if (a < b) {
			return -1;
		  }
		  if (a > b) {
			return 1;
		  }
		
		  return 0;
		});
		
		for(let i=0; i<posicoes.length; i++) {	
			let posicao = posicoes[i];
			let novaposicao = posicao - 45;
			
			fita.set(novaposicao, fita.get(posicao));
			fita.delete(posicao);
		}
		
		renderFita();
}
function moverDireita(){
	let posicoes = Array.from(fita.keys());
		
		posicoes.sort(function comparar(a, b) {
		  if (a > b) {
			return -1;
		  }
		  if (a < b) {
			return 1;
		  }
		
		  return 0;
		});
		
		for(let i=0; i<posicoes.length; i++) {	
			let posicao = posicoes[i];
			let novaposicao = posicao + 45;
			
			fita.set(novaposicao, fita.get(posicao));
			fita.delete(posicao);
		}
		
		renderFita();
}
function escreveNovoCaracter(novoCaracter){
	fita.set(660, novoCaracter);
	renderFita();
}

function renderTriangulo(){
	let canvasTriangulo = document.getElementById('triangulo');
    let context = canvasTriangulo.getContext('2d');
    context.beginPath();
	context.moveTo(25, 10);
	context.lineTo(10, 40);
	context.lineTo(40, 40);
	context.fill();
	context.stroke();
}

init();












