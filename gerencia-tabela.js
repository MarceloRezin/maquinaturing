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

function getMatriz(){
    let matriz = new Map();

    let cabecalho = document.getElementById('cabecalho');
    let linhas = document.getElementById('linhas');

    let chavesCabecalho = [];

    for (let i = 1; i < cabecalho.childElementCount; i++) {
        let celula = cabecalho.cells[i].children[0].value.trim();

        if(celula){
            if(!chavesCabecalho.includes(celula)){
                if(celula.length == 1){
                    chavesCabecalho.push(celula);
                    continue;
                }
                throw 'Erro: Celula com mais de um caracter na ' + i + 'ª coluna do cabeçalho';
            }
            throw 'Erro: Celula repetida na ' + i + 'ª coluna do cabeçalho';
        }
        throw 'Erro: Celula vazia na ' + i + 'ª coluna do cabeçalho';
    }

    let chavesLinhas = [];

    for (let i = 0; i < linhas.childElementCount; i++) {
        let celula = linhas.children[i].cells[0].children[0].value.trim();

        if(celula){
            if(!chavesLinhas.includes(celula)){
                chavesLinhas.push(celula); 
                continue;
            }

            throw 'Erro: Celula repetida na ' + (i + 1) + 'ª linha na coluna de estados';
        }
        
        throw 'Erro: Celula vazia na ' + (i+1) + 'ª linha na coluna de estados';
    }

    for (let i = 0; i < linhas.childElementCount; i++) {
    
        let coluna = new Map();
        let todosVazios = true;
        for (let j = 1; j < cabecalho.childElementCount; j++) {

            try{
                let estado = getEstado(chavesLinhas, chavesCabecalho, linhas.children[i].cells[j].children[0].value);

                todosVazios = todosVazios && estado.isVazio;
                
                coluna.set(chavesCabecalho[j - 1], estado); 
            }catch(e){
                throw 'Erro: ' + e + '. Em: E -> ' + chavesLinhas[i] + ' | C -> ' + chavesCabecalho[j - 1];
            }
        }

        //Se todos vazios for verdadeiro, siginifica que é um estado final, logo deve-se marcar todos os itens como final
        if(todosVazios){
            for (let [k, v] of coluna) {
                v.isFinal = true;
            }
        }

        matriz.set(chavesLinhas[i], coluna);
    }
    return matriz;
}

function getEstado(chavesLinhas, chavesCabecalho, celula){
    celula = celula.trim();

    if(!celula){
        return {isVazio: true};
    }

    let estadoSplit = celula.split(',');

    if(estadoSplit.length == 3){
        let estado = {};

        let proximoEstado = estadoSplit[0].trim();
        if(chavesLinhas.includes(proximoEstado)){
            estado.proximoEstado = proximoEstado;

            let novoCaracter = estadoSplit[1].trim();
            if(chavesCabecalho.includes(novoCaracter)){
                if (novoCaracter === '_') {
                    novoCaracter = ' ';
                }
                estado.novoCaracter = novoCaracter;

                let direcao = estadoSplit[2].trim().toUpperCase();
                if(direcao === 'E' || direcao === 'D'){
                    estado.direcao = direcao;

                    return estado;
                }

                throw 'Foi informado uma direção inválida'
            }

            throw 'Foi informado um caracter inexistente'
        }

        throw 'Foi informado um estado inexistente'
    }

    throw 'Transição incompleta';
}

function importTabela(tabela){

    let linhas = document.getElementById('linhas');

    if(tabela.length < 2){
        return;
    }

    if(tabela.length -1 > linhas.childElementCount){
        while(tabela.length - 1 > linhas.childElementCount) {
            addLinha();
        }
    }else if(tabela.length -1 < linhas.childElementCount){
        while (tabela.length -1 < linhas.childElementCount) {
            removeLinha();
        }
    }

    let cabecalho = document.getElementById('cabecalho');

    if(tabela[0].length > cabecalho.childElementCount){
        while (tabela[0].length > cabecalho.childElementCount) {
            addColuna();
        }
    }else if(tabela[0].length < cabecalho.childElementCount){
        while (tabela[0].length < cabecalho.childElementCount) {
            removeColuna();
        }
    }

    for (let i = 1; i < cabecalho.childElementCount; i++) {
        cabecalho.cells[i].children[0].value = tabela[0][i];
    }

    for (let i = 0; i < linhas.childElementCount; i++) {
        for (let j = 0; j < cabecalho.childElementCount; j++) {
            linhas.children[i].cells[j].children[0].value = tabela[i+1][j];
        }
    }
}

function importByNome(nome){

    if(nome === 'somar'){
        let soma = [6];
        soma[0] = ['Q', '*', '_', '>'];
        soma[1] = ['>', '', '', '0, >, D'];
        soma[2] = ['0', '0, *, D', '1, *, D', ''];
        soma[3] = ['1', '1, *, D', '2, _, E', ''];
        soma[4] = ['2', 'FIM, _, E', '', ''];
        soma[5] = ['FIM', '', '', ''];

        importTabela(soma);
    }else if (nome === 'subtrair'){
        let sub = [8];

        sub[0] = ['Q', '*', '_', '>'];
        sub[1] = ['>', '', '', '0, >, D'];
        sub[2] = ['0', '0, *, D', '1, _, D', ''];
        sub[3] = ['1', '1, *, D', '2, _, E', ''];
        sub[4] = ['2', '3, _, E', 'FIM, _, E', ''];
        sub[5] = ['3', '3, *, E', '3, _, E', '4, >, D'];
        sub[6] = ['4', '0, _, D', '4, _, D', ''];
        sub[7] = ['FIM', '', '', ''];

        importTabela(sub);
    }else if (nome === 'multiplicar'){
        let mult = [14];

        mult[0] = ['Q', '*', '_', 'K', 'Y', '>'];
        mult[1] = ['>', '', '', '', '', '0, >, D'];
        mult[2] = ['0', '0, *, D', '1, _, D', '', '', ''];
        mult[3] = ['1', '1, *, D', '2, _, E', '2, K, E', '', ''];
        mult[4] = ['2', '3, K, E', '8, _, D', '', '', ''];
        mult[5] = ['3', '3, *, E', '3, _, E', '3, K, E', '4, *, D', '4, >, D'];
        mult[6] = ['4', '5, Y, D', '1, _, D', '', '', ''];
        mult[7] = ['5', '5, *, D', '6, _, D', '', '', ''];
        mult[8] = ['6', '6, *, D', '7, _, D', '6, K, D', '', ''];
        mult[9] = ['7', '7, *, D', '3, *, E', '', '', ''];
        mult[10] = ['8', '', '9, >, E', '8, _, D', '', ''];
        mult[11] = ['9', '9, _, E', '9, _, E', '', '', '10, _, D'];
        mult[12] = ['10', '', '10, _, D', '', '', 'FIM, >, D'];
        mult[13] = ['FIM', '', '', '', '', ''];

        importTabela(mult);
    }else if (nome === 'dividir'){
        let div = [27];

        div[0] = ['Q', '*', '_', 'Y', 'Z', '>'];
        div[1] = ['>', '', '', '', '', '0, >, D'];
        div[2] = ['0', '0, *, D', '1, _, D', '', '', ''];
        div[3] = ['1', '1, *, D', '2, _, E', '2, Y, E', '', ''];
        div[4] = ['2', '3, Y, E', '5, _, D', '', '', ''];
        div[5] = ['3', '3, *, E', '3, _, E', '', '4, Z, D', '4, >, D'];
        div[6] = ['4', '0, Z, D', '16, _, D', '', '', ''];
        div[7] = ['5', '5, *, D', '6, _, D', '5, Y, D', '', ''];
        div[8] = ['6', '6, *, D', '7, *, E', '', '', ''];
        div[9] = ['7', '7, *, E', '8, _, E', '', '', ''];
        div[10] = ['8', '', '9, _, E', '8, Y, E', '', ''];
        div[11] = ['9', '14, *, D', '', '', '10, Z, D', ''];
        div[12] = ['10', '', '10, _, D', '11, Y, D', '', ''];
        div[13] = ['11', '11, *, D', '12, >, E', '11, Y, D', '', ''];
        div[14] = ['12', '12, _, E', '12, _, E', '12, _, E', '12, _, E', '13, _, D'];
        div[15] = ['13', '', '13, _, D', '', '', 'FIM, >, D'];
        div[16] = ['14', '', '15, _, D', '', '', ''];
        div[17] = ['15', '', '2, _, E', '15, *, D', '', ''];
        div[18] = ['16', '16, *, D', '', '17, *, D', '', ''];
        div[19] = ['17', '17, *, D', '', '18, *, D', '', ''];
        div[20] = ['18', '', '19, _, D', '18, Y, D', '', ''];
        div[21] = ['19', '19, *, D', '20, _, D', '', '', ''];
        div[22] = ['20', '20, *, D', '21, *, E', '', '', ''];
        div[23] = ['21', '21, *, E', '21, _, E', '22, Y, E', '23, Z, D', ''];
        div[24] = ['22', '17, *, D', '', '22, Y, E', '', ''];
        div[25] = ['23', '', '11, _, D', '', '', ''];
        div[26] = ['FIM', '', '', '', '', ''];

        importTabela(div);
    }else if (nome === 'igualar'){
        let igual = [14];

        igual[0] = ['Q', '*', '_', 'Y', '>'];
        igual[1] = ['>', '', '', '', '0, >, D'];
        igual[2] = ['0', '1, Y, D', '7, _, D', '', ''];
        igual[3] = ['1', '2, *, D', '6, _, D', '2, Y, E', ''];
        igual[4] = ['2', '2, *, D', '3, _, D', '', ''];
        igual[5] = ['3', '4, Y, E', '4, Y, E', '3, Y, D', ''];
        igual[6] = ['4', '5, *, E', '4, _, E', '4, Y, E', ''];
        igual[7] = ['5', '5, *, E', '5, _, E', '0, Y, D', ''];
        igual[8] = ['6', '7, Y, D', '7, Y, D', '6, Y, D', ''];
        igual[9] = ['7', '7, *, D', '8, _, E', '', ''];
        igual[10] = ['8', '8, _, E', '8, _, E', '8, *, E', '9, >, D'];
        igual[11] = ['9', 'FIM, *, E', '10, _, D', '', ''];
	igual[12] = ['10', '', 'FIM, _, E', '', '', '']
        igual[13] = ['FIM', '', '', '', '', ''];

        importTabela(igual);
    }
}

startListenner();
