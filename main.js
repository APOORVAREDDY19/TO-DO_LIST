const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".inputTask");
const tasksContainer = document.querySelector(".taskContainer");

let TODOS = [];


document.addEventListener("DOMContentLoaded", function () {
    const areTodosLoaded = loadTodos();
    areTodosLoaded && renderTodos(TODOS); // shorthand for if-condition
});

function loadTodos() {
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

// tasksContainer.addEventListener("edit",function(){
//     const EditTask = taskInput.value;

// })


function createAndPushPtag(task) {
    

    const LI=document.createElement("li")
    LI.setAttribute("class","TASKS"); //for tasks
    LI.setAttribute("id",task.taskId);

    const checkBox=document.createElement("input");
    checkBox.checked=task.isTaskDone;
    checkBox.setAttribute("type","checkbox");// for checkbox is task done

    const contentContainer=document.createElement("div");
    contentContainer.setAttribute("class","content");// this div is for task value and time stamp

    const textValue=document.createElement("p");
    textValue.textContent=task.taskValue;
    const timeStamp=document.createElement("p");
    timeStamp.textContent=task.TimeStamp

    contentContainer.appendChild(textValue);
    contentContainer.appendChild(timeStamp);

    const actionContainer=document.createElement("div");
    actionContainer.setAttribute("class","action"); //this div is used for edit and delete button 

    const editTask=document.createElement("button");
    editTask.textContent="Edit"
    const deleteTask=document.createElement("button");
    deleteTask.textContent="Delete"
    deleteTask.addEventListener("click",function(){
        handleTaskDelete(task.taskId)

    })



    actionContainer.appendChild(editTask);
    actionContainer.appendChild(deleteTask);

    LI.appendChild(checkBox);
    LI.appendChild(contentContainer);
    LI.appendChild(actionContainer);


    tasksContainer.appendChild(LI);

}

function saveTodosInLocalStorage(todos) {
    const stringifiedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", stringifiedTodos);
    return;
}

 function handleTaskDelete(deleteId){
    console.log(deleteId);
    TODOS=TODOS.filter((task)=>task.taskId!=deleteId)
    localStorage.setItem("todo",JSON.stringify(TODOS))
    const listItemToBeRemoved=document.getElementById(deleteId)
    listItemToBeRemoved.remove();
     
       
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

   const newTask={
    taskId:Date.now(),
    taskValue:taskInput.value,
    isTaskDone:false,
    TimeStamp:new Date()
   }

    createAndPushPtag(newTask);

    TODOS.push(newTask);
    saveTodosInLocalStorage(TODOS);

    taskInput.value = "";
    
});
 