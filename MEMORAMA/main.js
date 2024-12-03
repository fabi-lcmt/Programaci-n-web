let conta = 0;
let tar1 = null;
let tar2 = null;
let primRes = null;
let segRes = null;
let mov = 0;
let acet = 0;
let temp = false;
let timer = 120;
let timerIni = 120;
let tmpReg = null;

let mostrarMov = document.getElementById('mov');
let mostAcet = document.getElementById('acierto');
let mostTime = document.getElementById('t_res');

let sonido1 = new Audio('./sonidos/clik.wav');
let sonido2 = new Audio('./sonidos/correcto.wav');
let sonido3 = new Audio('./sonidos/ganaste.mp3');
let sonido4 = new Audio('./sonidos/incorrecto.wav');
let sonido5 = new Audio('./sonidos/perdiste.wav');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
numeros = numeros.sort(() => Math.random() - 0.5);

function contarTiempo() {
    tmpReg = setInterval(() => {
        timer--;
        mostTime.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tmpReg);
            bloquearTar();
            sonido5.play();
        }
    }, 1000);
}

function bloquearTar() {
    for (let i = 0; i <= 35; i++) {
        let tarBloq = document.getElementById(i);
        tarBloq.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
        tarBloq.disabled = true;
    }
}

function destapar(id) {
    if (temp == false) {
        contarTiempo();
        temp = true;
    }
    conta++;
    if (conta == 1) {
        tar1 = document.getElementById(id);
        primRes = numeros[id];
        tar1.innerHTML = `<img src="./imagenes/${primRes}.png" alt="">`;
        sonido1.play();
        tar1.disabled = true;

    } else if (conta == 2) {
        tar2 = document.getElementById(id);
        segRes = numeros[id];
        tar2.innerHTML = `<img src="./imagenes/${segRes}.png" alt="">`;
        tar2.disabled = true;

        mov++;
        mostrarMov.innerHTML = `Movimientos: ${mov}`;

        if (primRes == segRes) {
            conta = 0;
            acet++;
            mostAcet.innerHTML = `Aciertos: ${acet}`;
            sonido2.play();
            if (acet == 18) {
                sonido3.play();
                clearInterval(tmpReg);
                mostAcet.innerHTML = `Aciertos: ${acet}`;
                mostTime.innerHTML = `Genial, solo demoraste ${timerIni - timer} segundos`;
                mostrarMov.innerHTML = `Movimientos: ${mov}`;
            }

        } else {
            sonido4.play();
            setTimeout(() => {
                tar1.innerHTML = ' ';
                tar2.innerHTML = ' ';
                tar1.disabled = false;
                tar2.disabled = false; 
                conta = 0;
            }, 800);
        }
    }
}

function reiniciar() {
    conta = 0;
    tar1 = null;
    tar2 = null;
    primRes = null;
    segRes = null;
    mov = 0;
    acet = 0;
    temp = false;
    timer = 120;
    clearInterval(tmpReg);

    mostrarMov.innerHTML = `Movimientos: ${mov}`;
    mostAcet.innerHTML = `Aciertos: ${acet}`;
    mostTime.innerHTML = `Tiempo: ${timer} segundos`;

    numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
    numeros = numeros.sort(() => Math.random() - 0.5);

    for (let i = 0; i <= 35; i++) {
        let tar = document.getElementById(i);
        tar.innerHTML = ' ';
        tar.disabled = false;
    }
}


