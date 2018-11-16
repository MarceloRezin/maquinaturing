function erroToast(texto){
    showToast('#D32F2F', texto);
}

function sucessoToast(texto) {
    showToast('#388E3C', texto);
}

function showToast(cor, texto){
    Toastify({
        text: texto,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top",
        positionLeft: false,
        backgroundColor: cor,
    }).showToast();
}