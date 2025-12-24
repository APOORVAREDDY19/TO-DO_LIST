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
    // here we are adding an event to the check box and if check box is ticked it will have line through css
    checkBox.addEventListener("change",function(){
        task.isTaskDone=checkBox.checked;
        if (checkBox.checked){
            textValue.classList.add("done");
        }
        else{
            textValue.classList.remove("done");
        }
        saveTodosInLocalStorage(TODOS);// this for local storage
    }
    );
        
    
    checkBox.setAttribute("type","checkbox");// for checkbox is task done

    const contentContainer=document.createElement("div");
    contentContainer.setAttribute("class","content");// this div is for task value and time stamp

    const textValue=document.createElement("p");
    textValue.textContent=task.taskValue;
    if (task.isTaskDone){
        textValue.classList.add("done");
    }
    textValue.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const updatedText = textValue.textContent.trim();

        if (updatedText === "") {
            alert("Task cannot be empty");
            textValue.textContent = task.taskValue;
        } else {
            for (let i = 0; i < TODOS.length; i++) {
                if (TODOS[i].taskId === task.taskId) {
                    TODOS[i].taskValue = updatedText;
                }
            }
            saveTodosInLocalStorage(TODOS);
        }

        textValue.contentEditable = false;
    }
});
textValue.addEventListener("blur", function () {
    const updatedText = textValue.textContent.trim();

    if (updatedText === "") {
        textValue.textContent = task.taskValue;
    } else {
        for (let i = 0; i < TODOS.length; i++) {
            if (TODOS[i].taskId === task.taskId) {
                TODOS[i].taskValue = updatedText;
            }
        }
        saveTodosInLocalStorage(TODOS);
    }

    textValue.contentEditable = false;
});





    const timeStamp=document.createElement("p");
    timeStamp.textContent=task.TimeStamp

    contentContainer.appendChild(textValue);
    contentContainer.appendChild(timeStamp);

    const actionContainer=document.createElement("div");
    actionContainer.setAttribute("class","action"); //this div is used for edit and delete button 

    const editTask=document.createElement("button");
    editTask.textContent="Edit"//edit
    editTask.addEventListener("click",function(){
        textValue.contentEditable=true;
        textValue.focus();
    });




    const deleteTask=document.createElement("button");
    deleteTask.textContent="Delete"//delete
    
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
    const isConfirmed=window.confirm("Are you ready for deleting?");
if (!isConfirmed){
    return;
}
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

function updateTaskCounts(){
    const total=TODOS.length;
    const completed=TODOS.filter(task => task.isTaskDone).length;


    document.getElementById("totalCount").textContent=`Total Tasks: ${total}`;
    document.getElementById("completedCount").textContent=`Completed Tasks: ${completed}`;
}
 
updateTaskCounts();