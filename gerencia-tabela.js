function addLinha(opcoes) {
    showOpcoes(opcoes);

    var linhas =  document.getElementById('linhas');
    var cabecalho =  document.getElementById('cabecalho');

    var numColunas = cabecalho.childElementCount;

    //Incrementa o nome do estado automaticamente
    var q = 0;
    if(linhas.childElementCount > 0){
        //Recupera o valor contido no estado da ultima linha
        var valor = parseInt(linhas.children[linhas.childElementCount - 1].children[0].children[0].value) + 1;

        //Verifica se é numero
        q = valor + '' != 'NaN' ? valor : '';
    }

    var novaLinha = document.createElement("tr");

    for(var i=0; i<numColunas; i++){
        var input = document.createElement('input');

        var celula;

        if(i == 0){
            celula = document.createElement("th");
            celula.setAttribute('scope', 'row'); 

            //Define o valor do estado
            input.setAttribute('value', q);
        }else{
            celula = document.createElement("td");
        }
        
        celula.appendChild(input);
        novaLinha.appendChild(celula);
	}

    linhas.appendChild(novaLinha);
}

function removeLinha(opcoes) {
    showOpcoes(opcoes);
    var linhas =  document.getElementById('linhas');

    if(linhas.childElementCount > 0){ //Se tem algo pra apagar
		linhas.removeChild(linhas.children[linhas.childElementCount - 1]);
    }
}

function addColuna(opcoes) {
    showOpcoes(opcoes);
    //Adiciona a celuna no cabecalho
    var cabecalho =  document.getElementById('cabecalho');

    var celulaCabecalho = document.createElement("th");
    celulaCabecalho.setAttribute('scope', 'col');
    celulaCabecalho.appendChild(document.createElement('input'));

    cabecalho.appendChild(celulaCabecalho);

    //Adiciona as celulas nas linhas
    var linhas =  document.getElementById('linhas');

    for(var i=0; i<linhas.childElementCount; i++){
        var celula = document.createElement("td");
        celula.appendChild(document.createElement('input'));

        linhas.children[i].appendChild(celula);
    }
}

function removeColuna(opcoes) {
    showOpcoes(opcoes);
    //Remove a ultima celula do cabecalho
    var cabecalho =  document.getElementById('cabecalho');

    if(cabecalho.childElementCount > 2){
        cabecalho.removeChild(cabecalho.children[cabecalho.childElementCount -1]);
    
        //Remove a ultima celula de cada linha
        var linhas =  document.getElementById('linhas');
    
        for(var i=0; i<linhas.childElementCount; i++){
            var linha = linhas.children[i];
            linha.removeChild(linha.children[linha.childElementCount -1])  ;
        }
    }
}

function showOpcoes(opcoes){
    if(opcoes){
        var opcao = document.getElementById(opcoes);

        if(opcao.style.display == 'inline'){
            opcao.style.display = 'none';
        }else{
            opcao.style.display = 'inline';
        }     
    }
}

function startListenner(){
    document.addEventListener('keydown', function (e) {
        if(e.altKey){
            if (e.keyCode === 38) {
                removeLinha();
            }else if (e.keyCode === 40) {
                addLinha();
            }else if (e.keyCode === 37) {
                removeColuna();
            }else if (e.keyCode === 39) {
                addColuna();
            }
        }
    });

    var e = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(e);
}

startListenner();