// Creamos clases. 

class Persona {
  constructor (nombre, email,password,edad) {
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.edad = edad;
  }

}

//Creamos un array de objetos. 

const personas = [];


//Creamos las variables necesarias: 

const idFormulario = document.getElementById('formulario');

idFormulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const edad = document.getElementById('edad').value;
  //Creamos el objeto persona
  const persona = new Persona (nombre, email, password,edad);
  //Agregamos los datos en el array
  personas.push(persona);
  //Guardamos los datos en el localStorage. 
  localStorage.setItem('Persona', JSON.stringify(personas));


  //Muestro el resultado con la siguiente función: 
  mostrarInfo(persona);
})


const resultado = document.getElementById('infoUsuarios');

const mostrarInfo = (persona) => {
  resultado(edad)

}

//Muestro el localStorage. 

const botonAdmin = document.getElementById('admin');
const datosAdmin = document.getElementById('datosAdmin');



//Condicion ser Mayor de Edad//

/**let edad = 18;
let resultad;


if (edad < 18 ){
  resultado = "menor de edad";
  }else{
      resultado = "mayor de edad";
  }


  console.log(resultado);

  console.log ();

  resultado = edad < 22 ? "menor de edad" : "mayor de edad";

  console.log(resultado)

  console.log();

  resultado = edad <= 12 ? "niño" : edad < 21 ? "adolecente" : "adulto";
  
  console.log(resultado)*/

///

const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentTiradorIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvasores = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < alienInvasores.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvasores[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvasores.length; i++) {
    squares[alienInvasores[i]].classList.remove('invader')
  }
}

squares[currentTiradorIndex].classList.add('Tirador')


function moveTirador(e) {
  squares[currentTiradorIndex].classList.remove('Tirador')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentTiradorIndex % width !== 0) currentTiradorIndex -=1
      break
    case 'ArrowRight' :
      if (currentTiradorIndex % width < width -1) currentTiradorIndex +=1
      break
  }
  squares[currentTiradorIndex].classList.add('Tirador')
}
document.addEventListener('keydown', moveTirador)

function moveInvaders() {
  const leftEdge = alienInvasores[0] % width === 0
  const rightEdge = alienInvasores[alienInvasores.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvasores.length; i++) {
        alienInvasores[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvasores.length; i++) {
        alienInvasores[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvasores.length; i++) {
    alienInvasores[i] += direction
  }

  draw()

  if (squares[currentTiradorIndex].classList.contains('invader', 'Tirador')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvasores.length; i++) {
    if(alienInvasores[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvasores.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentTiradorIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvasores.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case 'x':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)