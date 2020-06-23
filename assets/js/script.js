//console.dir(window.document);


var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

function createTaskHandler(){
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);//ORDER IS IMPORTANT AND SPELLING TOO
    //console.log(event);
}

formEl.addEventListener("submit", createTaskHandler);

//buttonEl.addEventListener("click", createTaskHandler);
//console.log(buttonElement);