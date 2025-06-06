//  Referencias a elementos HTML
const inputTask = document.getElementById("task-input");
const btnAddTask = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");

//  Detectar Enter en el input
inputTask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

//  Función para guardar tareas en localStorage
function guardarTareas() {
  const tareas = [];
  document.querySelectorAll("#todo-list li").forEach((li) => {
    tareas.push({
      texto: li.firstChild.textContent.trim(),
      completada: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

//  Función para cargar tareas desde localStorage al iniciar
function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
  if (tareasGuardadas) {
    tareasGuardadas.forEach((tarea) => {
      crearTarea(tarea.texto, tarea.completada);
    });
  }
}

//  Función que crea una tarea (reutilizable)
function crearTarea(texto, completada = false) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (completada) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    guardarTareas();
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "x";
  btnDelete.className = "delete-btn";
  btnDelete.addEventListener("click", function (event) {
    event.stopPropagation(); // evita que se tache al borrar
    li.remove();
    guardarTareas();
  });

  li.appendChild(btnDelete);
  todoList.appendChild(li);
}

//  Función principal que agrega una nueva tarea desde el input
function addTask() {
  const taskText = inputTask.value.trim();
  if (taskText === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  crearTarea(taskText);
  guardarTareas();

  inputTask.value = "";
  inputTask.focus();
}

// Función para aplicar filtro
function aplicarFiltro(filtro) {
  const tareas = document.querySelectorAll("#todo-list li");

  tareas.forEach((tarea) => {
    const completada = tarea.classList.contains("completed");

    if (filtro === "all") {
      tarea.style.display = "flex";
    } else if (filtro === "completed" && !completada) {
      tarea.style.display = "none";
    } else if (filtro === "pending" && completada) {
      tarea.style.display = "none";
    } else {
      tarea.style.display = "flex";
    }
  });
}

//  Click en el botón de añadir
btnAddTask.addEventListener("click", addTask);
// Escuchar clicks en los botones de filtro
const botonesFiltro = document.querySelectorAll(".filter-btn");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    const filtro = boton.getAttribute("data-filter");
    aplicarFiltro(filtro);
  });
});

// Cargar tareas cuando se abre la página
cargarTareas();
