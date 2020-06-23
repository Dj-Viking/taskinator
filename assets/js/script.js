//console.dir(window.document);



var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

function createTaskHandler(){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);//ORDER IS IMPORTANT AND SPELLING TOO
}

buttonEl.addEventListener("click", createTaskHandler);


//console.log(buttonElement);