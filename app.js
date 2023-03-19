let toDos = [];

// Clase constructora de tareas a realizar
class ToDo {
    constructor(descripcion, fechaCreacion, fechaLimite, prioridad, id) {
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.fechaLimite = fechaLimite;
        this.prioridad = prioridad;
        this.id = id
    }
}

//elementos del DOM del home
//inputs - form
let input_descripcion = document.getElementById("input_descripcion");
let input_deadline = document.getElementById("input_deadline");
let select_prioridad = document.getElementById("select_prioridad");
//Acciones
let btn_agregar = document.getElementById("boton_agregar");
let btn_limpiar = document.getElementById("boton_limpiar");
//Visualiaciones
let tabla_prioritarias = document.getElementById("tabla_prioritarias");
let tabla_no_prioritarias = document.getElementById("tabla_no_prioritarias");
//Icono borrar
const iconoBorrar = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.16 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>delete</title><path class="cls-1" d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>`

//Evento boton agregar
let prioritarias;
let noPrioritarias;

boton_agregar.onclick = (e) => {
    e.preventDefault();

    //Crea el objeto y lo pushea al array de to do´s
    let descripcion = input_descripcion.value;
    let fechaCreacion = new Date();
    let deadline = input_deadline.value;
    let prioridad = select_prioridad.value;
    let id = Math.random();
    const nuevoToDo = new ToDo(descripcion, fechaCreacion, deadline, prioridad, id);
    toDos.push(nuevoToDo)

    //Agrega el objeto al local storage (para recuperar el listado de To Do´s borrados en caso de desearlo):
    toDos.forEach(element => {
        const stringElement = JSON.stringify(element)
        localStorage.setItem(`id: ${element.id}`, stringElement)
    });

    editaHTML();
};

const funcion_borrar = (e) => {
    item_a_borrar = e.target.parentNode.parentNode;
    toDos = toDos.filter((element) => parseFloat(item_a_borrar.id) != element.id)
    editaHTML();
}

//boton limpiar
btn_limpiar.onclick = () => {
    lista_prioritarias.innerHTML = "";
    lista_no_prioritarias.innerHTML = "";
    prioritarias = [];
    noPrioritarias = [];
}

//Funcion para agregar al HTML el listado de To Do´s discriminado por prioridad
const editaHTML = () => {
    //Crea lista con las de prioridad alta
    prioritarias = toDos.filter((element) => element.prioridad === "alta");

    //Crea el HTML con las de prioridad alta
    tabla_prioritarias.innerHTML = `<tr><th>Descripcion</th><th>Deadline</th><th>Acción</th></tr>`;
    prioritarias.forEach((element) => {
        let row_prioritarias = document.createElement('tr');
        row_prioritarias.innerHTML = `<td>${element.descripcion}</td><td>${element.fechaLimite}</td><td><button class="delete_icon">borrar</button></td>`;
        row_prioritarias.id = element.id;
        row_prioritarias.className = "row_prioritarias"
        tabla_prioritarias.append(row_prioritarias);
    });

    //Crea lista con las de prioridad media o baja
    noPrioritarias = toDos.filter((element) => element.prioridad != "alta");

    //Crea el HTML con las de prioridad media o baja
    tabla_no_prioritarias.innerHTML = `<tr><th>Descripcion</th><th>Prioridad</th><th>Deadline</th><th>Acción</th></tr>`;
    noPrioritarias.forEach((element) => {
        let clase = ""
        element.prioridad === "media" ? clase = "yellow" : clase = "green";
        let row_no_prioritarias = document.createElement('tr');
        row_no_prioritarias.innerHTML = `<td>${element.descripcion}</td><td class="${clase}">${element.prioridad}</td><td>${element.fechaLimite}</td><td><button class="delete_icon">borrar</button></td>`;
        row_no_prioritarias.id = element.id;
        row_no_prioritarias.className = "row_no_prioritarias"
        tabla_no_prioritarias.append(row_no_prioritarias);
    });

    //Evento para el botón borrar
    let botones_borrar = document.querySelectorAll(".delete_icon");
    for (let btn of botones_borrar) {
        btn.addEventListener('click', funcion_borrar)
    }
}

