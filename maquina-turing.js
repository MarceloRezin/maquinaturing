var matriz;
var estado;
var pause = false;
var stop = false;


function carregarMaquina(){

    try{
        matriz = getMatriz();
        setEstadoAtual(document.getElementById('inicial').value);

        if (!estado) {
            erroToast('Erro: Você deve informar o estado inical!');
            return;
        }

        if (!matriz.has(estado)) {
            erroToast('Erro: O estado inicial informado não existe na tabela de transições!');
            return;
        }

        carregarFita();
        stop = false;
    }catch(e){
        erroToast(e);
    }
}

//Retorna true caso chegue em um estado final
function realizarPasso(){
    if (matriz && estado && fita && !stop) {
        let linha = matriz.get(estado);
        let transicao = linha.get(getCaracter());

        if (!transicao){
            throw 'Trasição não encontrada. E -> ' + estado + ' C -> ' + getCaracter();
        }

        if(transicao.isVazio){
            if (transicao.isFinal){
                stop = true;
                sucessoToast('Execução finalizada!')
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
                    if(!stop){
                        execucaoAutomatica().then().catch(reject);
                    }
                }catch(e){
                    reject(e);
                }
            }, document.getElementById('teste').value);
    });
}

function run(){
    try{
        realizarPasso();
    }catch(e){
        erroToast('Erro: ' + e)
    }
}

function runAll() {
    execucaoAutomatica().then().catch(function (e) {
        erroToast('Erro: ' + e)
    });
}

function setEstadoAtual(novoEstado){
    estado = novoEstado;
    document.getElementById('estadoAtual').innerHTML = estado;
}