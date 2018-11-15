function erroToast(texto){
    Toastify({
        text: texto,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top",
        positionLeft: false,
        backgroundColor: "#D32F2F",
    }).showToast();
}