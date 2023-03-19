let registro = [];

//elementos del DOM registro
let tabla_registro = document.getElementById("tabla_registro");

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    
    const objeto = JSON.parse(localStorage.getItem(clave))
    registro.push(objeto);
}

 //Crea el HTML con las de prioridad media o baja
 //tabla_registro.innerHTML = `<tr><th>Descripcion</th><th>Prioridad</th><th>Deadline</th></tr>`;
 registro.forEach((element) => {
     let clase = ""
     element.prioridad === "media" ? clase = "yellow" :
     element.prioridad === "alta"  ? clase = "red" :
     clase = "green"
     let item_registro = document.createElement('tr');
     item_registro.innerHTML = `<td>${element.descripcion}</td><td class="${clase}">${element.prioridad}</td><td>${element.fechaLimite}</td>`;
     item_registro.id = element.id;
     item_registro.className = "item_registro"
     tabla_registro.append(item_registro);
 });