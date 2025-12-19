const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".inputTask");
const tasksContainer = document.querySelector(".taskContainer");

const TODOS = [];

document.addEventListener("DOMContentLoaded", function () {
    const areTodosLoaded = loadTodos();
    areTodosLoaded && renderTodos(TODOS); // shorthand for if-condition
});

function loadTodos() {``
    console.log(TODOS);
    const stringifiedTodos = localStorage.getItem("todos"); // get stringified todos
    const todosArray = JSON.parse(stringifiedTodos); // convert into JS array

    if (todosArray && todosArray.length) {
        TODOS.push(...todosArray); // spread items into local TODOS array
        console.log(TODOS);
        return true;
    }
    return false;
}

function renderTodos(todos) {
    for (let index = 0; index < todos.length; index++) {
        createAndPushPtag(todos[index]);
    }
}

function createAndPushPtag(task) {
    const pTag = document.createElement("p");
    pTag.setAttribute("class", "task");
    pTag.textContent = task;
    tasksContainer.appendChild(pTag);
}

function saveTodosInLocalStorage(todos) {
    const stringifiedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", stringifiedTodos);
    return;
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTask = taskInput.value;
    const pTag = document.createElement("ol");
    pTag.setAttribute("class", "task");
    pTag.textContent = newTask;

    tasksContainer.appendChild(pTag);

    TODOS.push(newTask);
    saveTodosInLocalStorage(TODOS);

    taskInput.value = "";
    // taskInput.focus();
});
