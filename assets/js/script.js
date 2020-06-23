console.dir(window.document);


var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskNameInput = document.querySelector("input[name='task-name']");
//taskNameInput = "here is the string stored in taskNameInput variable";
//check if its working  
//console.log(taskNameInput);

function createTaskHandler(){
    event.preventDefault();
    //cool it works. this will store whatever value we type into the text field to be stored into this variable.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //checking if its working
    console.dir(taskNameInput);
    //dynamically creates a new element inside existing HTML code
    var listItemEl = document.createElement("li");
    //assigning the CSS class to HTML element we created <li>
    listItemEl.className = "task-item";//not entering any text here just creating the list item to contain something inside it
    //listItemEl.textContent = "This is a new task.";
    //storing the value of the text input area into the newly generated list item element
    //****dont use this this will put your task name as the task item 'name' lol
    //****listItemEl.textContent = taskNameInput; 
    //this is attaching the task type that we select from the dropdown menu 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);//check if its storing correctly
    //create a <div> container in the HTML to store the task type 
    var taskInfoEl = document.createElement("div");
    //class for tasktype
    taskInfoEl.className = "task-info";
    //this will set up the dynamic injection of the HTML content into the newly created div to contain the tasktype
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    //inject the innerHTML stored inside the variable taskInfoEl
    listItemEl.appendChild(taskInfoEl);
    //finally inject the <div> that contains all of the items that consist of the task-type that we want to inject
    tasksToDoEl.appendChild(listItemEl);
    //this will push the new list item Child element that we generated above into the HTML Parent element that we want it in.
    tasksToDoEl.appendChild(listItemEl);
    //ORDER IS IMPORTANT AND SPELLING TOO
    //console.log(event);
}

formEl.addEventListener("submit", createTaskHandler);

//buttonEl.addEventListener("click", createTaskHandler);
//console.log(buttonElement);