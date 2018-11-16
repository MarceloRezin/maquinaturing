var matriz;
var estado;
var play = false; //Verdadeiro quando a máquina está executando em modo automático
var pause = false;
var stop = false;

function carregarMaquina(){
    try{
        matriz = getMatriz();
        setEstadoAtual(document.getElementById('inicial').value);

        if (!estado) {
            erroToast('Erro: Você deve informar o estado inical!');
            stop = true;
            updateStatus();
            return;
        }

        if (!matriz.has(estado)) {
            erroToast('Erro: O estado inicial informado não existe na tabela de transições!');
            stop = true;
            updateStatus();
            return;
        }

        carregarFita();
        stop = false;
        pause = false;
        play = false;

        updateStatus();
    }catch(e){
        erroToast(e);
        stop = true;
        updateStatus();
    }
}

function realizarPasso(){
    if (matriz && estado && fita && !stop && !pause) {
        let linha = matriz.get(estado);
        let transicao = linha.get(getCaracter());

        if (!transicao){
            throw 'Trasição não encontrada. E -> ' + estado + ' C -> ' + getCaracter();
        }

        if(transicao.isVazio){
            if (transicao.isFinal){
                stop = true;
                sucessoToast('Execução finalizada!');
                updateStatus();
                return;
            }

            throw 'Trasição não encontrada. E -> ' + estado + ' C -> ' + getCaracter();
        }
        setEstadoAtual(transicao.proximoEstado);

        escreveNovoCaracter(transicao.novoCaracter);
        mover(transicao.direcao);
    }
}

function execucaoAutomatica(){
    return new Promise(function(resolve, reject) {
        
        window.setTimeout(
            function () {
                try{
                    realizarPasso();
                    if(!stop && play){
                        execucaoAutomatica().then().catch(reject);
                    }
                }catch(e){
                    reject(e);
                }
            }, document.getElementById('teste').value);
    });
}

function run(){
    if (pause) {
        pause = false;
        play = false;

        updateStatus();
        return;
    }

    if (play) { // Já está executando em modo automático
        return;
    }

    try{
        realizarPasso();
    }catch(e){
        erroToast('Erro: ' + e);
        stop = true;
        updateStatus();
    }
}

function runAll() {
    if(pause){
        pause = false;
        updateStatus();
        return;
    }

    if(play){
        return;
    }

    play = true;
    updateStatus();
    execucaoAutomatica().then().catch(function (e) {
        erroToast('Erro: ' + e);
        stop = true;
        updateStatus();
    });
}

function setEstadoAtual(novoEstado){
    estado = novoEstado;
    document.getElementById('estadoAtual').innerHTML = estado;
}

function pauseMaquina(){
    pause = !pause;
    updateStatus();
}

function stopMaquina(){
    stop = true;
    updateStatus();
}

function updateStatus(){
    let estado = '';
    
    if (stop) {
        estado = 'Parada';
    } else if (pause) {
        estado = 'Pausada';
    } else if (play) {
        estado = 'Rodando';
    } else {
        estado = 'Pronta';
    }

    document.getElementById('statusMaquina').innerHTML = estado;
}