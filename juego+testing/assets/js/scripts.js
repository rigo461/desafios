/* Iniciamos el contador */
let puntosUsuario = 0;
let puntosPC = 0;
let juegoTerminado = false; // Variable para verificar si el juego ha terminado

/* Traemos las variables a utilizar */
let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let eligeTuArma = document.querySelector("#textArma");
let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPc = document.querySelector("#eleccion-computadora");

/* Definiendo la funcionalidad de los botones */
let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach((boton) => {
  boton.addEventListener("click", iniciarTurno);
});

/* Iniciar el turno */
function iniciarTurno(e) {
  if (juegoTerminado) {
    return; // Salir de la función si el juego ha terminado
  }

  let eleccionPC = Math.floor(Math.random() * 3);
  let eleccionUsuario = e.currentTarget.id;

  /* Colocamos los valores de cada arma */
  // piedra => 0
  // papel => 1
  // tijera => 2

  if (eleccionPC === 0) {
    eleccionPC = "piedra";
  } else if (eleccionPC === 1) {
    eleccionPC = "papel";
  } else if (eleccionPC === 2) {
    eleccionPC = "tijera";
  }

  /* Se establecen las condiciones del juego (victoria, derrota y empate) */
  // piedra vence a tijera
  // tijera vence a papel
  // papel vence a piedra
  // si son iguales es empate

  if (
    (eleccionUsuario === "piedra" && eleccionPC === "tijera") ||
    (eleccionUsuario === "tijera" && eleccionPC === "papel") ||
    (eleccionUsuario === "papel" && eleccionPC === "piedra")
  ) {
    ganaUsuario();
  } else if (
    (eleccionPC === "piedra" && eleccionUsuario === "tijera") ||
    (eleccionPC === "tijera" && eleccionUsuario === "papel") ||
    (eleccionPC === "papel" && eleccionUsuario === "piedra")
  ) {
    ganaPC();
  } else {
    empate();
  }

  /* Estableciendo los mensajes de aviso */
  mensaje.classList.remove("disabled");
  contenedorEleccionUsuario.innerText = eleccionUsuario;
  contenedorEleccionPc.innerText = eleccionPC;

  /* Estableciendo el contador en 5 */
  if (puntosUsuario === 5 || puntosPC === 5) {
    juegoTerminado = true; // El juego ha terminado
    if (puntosUsuario === 5) {
      instrucciones.innerText = "¡GANASTE!";
    } else {
      instrucciones.innerText = "¡Perdiste!";
    }
    eligeTuArma.classList.add("disabled");
  }
}

/* Establecemos una función para el puntaje del usuario y de la PC */
function ganaUsuario() {
  puntosUsuario++;
  contenedorPuntosUsuario.innerText = puntosUsuario;
  contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥";
}

function ganaPC() {
  puntosPC++;
  contenedorPuntosPC.innerText = puntosPC;
  contenedorGanaPunto.innerText = "¡La computadora ganó un punto! 😭";
}

function empate() {
  contenedorGanaPunto.innerText = "¡Empate!";
}

/* Escribimos la función para terminar el juego*/
function terminarJuego() {
  juegoTerminado = false; // Reiniciamos la variable de juego terminado

  eligeTuArma.classList.remove("disabled");
  mensaje.classList.add("disabled");

  puntosUsuario = 0;
  puntosPC = 0;

  contenedorPuntosUsuario.innerText = puntosUsuario;
  contenedorPuntosPC.innerText = puntosPC;

  instrucciones.innerText = "El primero en llegar a 5 puntos gana.";
}
