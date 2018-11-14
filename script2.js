var a = 210;
var canvas;
var context;
var tam = 25;
var indice = 660;
var texto;
var parametro;
var simbolo;

function carregar(){
    canvas = document.getElementById('fita');
    context = canvas.getContext('2d');
    var pont = document.getElementById('ponteiro');
    var c = pont.getContext('2d');
    context.beginPath();

    var b = 7;
	tam *= 45;
	texto = document.form1.tam1.value;
	var array = [];
    for(var i=0; i<texto.length; i++){
		array[i] = texto.charAt(i);
		array[parametro] = simbolo;
    }
    context.font = '25px Arial';
    var aux = a;
	var q = 0;
    for(aux; aux<tam; aux+=45){
    context.rect(aux, b, 40, 40);
    if(aux >= indice && q <= texto.length){
	   if(q <= texto.length -1){//Para nao imprimir texto undefined
     context.strokeText(array[q], aux+14, 38);
	   }
		q++;
   }
}
  c.moveTo(25, 10);
  c.lineTo(10, 40);
  c.lineTo(40, 40);
  c.fill();
    
context.stroke();
}

function mover(){
		console.log(indice);
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(indice <= 660){
		tam = 25;
		indice = indice - 45;
		if(indice == 165){
			indice = 210;
		}
	}else if(indice >= 705){
		tam = 25;
		indice = indice -45;
	}
	/*if(indice == 660){
		//a = 255;
		tam = 25;
		indice = 615;
	}else if(indice == 615){
		//a = 300;
		tam = 25;
		indice = 570;
	}else if(indice == 570){
		//a = 345;
		tam = 25;
		indice = 525;
	}else if(indice == 525){
		//a = 390;
		tam = 25;
		indice = 480;
	}else if(indice == 480){
		//a = 435;
		tam = 25;
		indice = 435;
	}else if(indice == 435){
		//a = 480;
		tam = 25;
		indice = 390;
	}else if(indice == 390){
		//a = 525;
		tam = 25;
		indice = 345;
	}else if(indice == 345){
		//a = 570;
		tam = 25;
		indice = 300;
	}else if(indice == 300){
		//a = 615;
		tam = 25;
		indice = 255;
	}else if(indice == 255){
		//a = 660;
		tam = 25;
		indice = 210;
	}else if(indice == 210){
		//a = 660;
		tam = 25;
		indice = 210;
	}else if(indice == 1110){
		//a = -195;
		tam = 25;
		indice = 1065;
	}else if(indice == 1065){
		tam = 25;
		indice = 1020;
	}else if(indice == 1020){
		tam = 25;
		indice = 975;
	}else if(indice == 975){
		tam = 25;
		indice = 930;
	}else if(indice == 930){
		tam = 25;
		indice = 885;
	}else if(indice == 885){
		tam = 25;
		indice = 840;
	}else if(indice == 840){
		tam = 25;
		indice = 795;
	}else if(indice == 795){
		tam = 25;
		indice = 750;
	}else if(indice == 750){
		tam = 25;
		indice = 705;
	}else if(indice == 705){
		tam = 25;
		indice = 660;
	}*/
	console.log(indice);
	carregar();
	/*canvas.classList.remove("alternativo");
	canvas.classList.add("alternativo2");*/
}
function moverD(){
		console.log(indice);
	context.clearRect(0, 0, canvas.width, canvas.height);
	/*if(indice >= 660){
		tam = 25;
		indice = indice + 45;
		if(indice == 1110){
			indice = 1110;
		}
	}*/if(indice >= 210){
		tam = 25;
		indice = indice +45;
		if(indice == 1110){
			indice = 1110;
		}else if(indice == 525){
			parametro = 3;
			simbolo = 'A';
		}
	}
	/*if(indice == 660){
		//a = 165;
		tam = 25;
		indice = 705;
	}else if(indice == 705){
		//a = 120;
		tam = 25;
		indice = 750;
	}else if(indice == 750){
		//a = 75;
		tam = 25;
		indice = 795;
	}else if(indice == 795){
		//a = 30;
		tam = 25;
		indice = 840;
	}else if(indice == 840){
		//a = -15;
		tam = 25;
		indice = 885;
	}else if(indice == 885){
		tam = 25;
		indice = 930;
	}else if(indice == 930){
		//a = -105;
		tam = 25;
		indice = 975;
	}else if(indice == 975){
		//a = -150;
		tam = 25;
		indice = 1020;
	}else if(indice == 1020){
		//a = -195;
		tam = 25;
		indice = 1065;
	}else if(indice == 1065){
		tam = 25;
		indice = 1110;
	}else if(indice == 1110){
		//a = -240;
		tam = 25;
		indice = 1110;
	}else if(indice == 210){
		//a = 615;
		tam = 25;
		indice = 255;
	}else if(indice == 255){
		tam = 25;
		indice = 300;
	}else if(indice == 300){
		//a = 525;
		tam = 25;
		indice = 345;
	}else if(indice == 345){
		//a = 480;
		tam = 25;
		indice = 390;
	}else if(indice == 390){
		//a = 435;
		tam = 25;
		indice = 435;
	}else if(indice == 435){
		//a = 390;
		tam = 25;
		indice = 480;
		//document.form1.tam1.value = '>xxx$_xxx_';
		parametro = 4;
		simbolo = '$';
	}else if(indice == 480){
		//a = 345;
		tam = 25;
		indice = 525;
	}else if(indice == 525){
		//a = 300;
		tam = 25;
		indice = 570;
	}else if(indice == 570){
		//a = 255;
		tam = 25;
		indice = 615;
	}else if(indice == 615){
		//a = 210;
		tam = 25;
		indice = 660;
	}*/
		console.log(indice);
    carregar();
}