console.dir(window.document);


var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskNameInput = document.querySelector("input[name='task-name']");
//taskNameInput = "here is the string stored in taskNameInput variable";
//check if its working  
//console.log(taskNameInput);

function taskFormHandler(event){
    event.preventDefault();
    
    //cool it works. this will store whatever value we type into the text field to be stored into this variable.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //checking if its working
    console.dir(taskNameInput);
    //this is attaching the task type that we select from the dropdown menu 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);//check if its storing correctly
    
    //package up data as an object
    //this is passed into the parameter (event) from the function argument below (taskDataObj)
    var taskDataObj =
    {
        name: taskNameInput,
        type: taskTypeInput
        
    };
    //check if input values are empty strings
    //if the strings entered are NOT filled out or empty it is considered a falsy value
    //if its NOT true that a string is entered essentially
    if(!taskNameInput || !taskTypeInput){
        alert("You need to enter something to submit into the task form.")
        formEl.reset();//this must be placed before the return statement!!`
        return false;
    }
    createTaskEl(taskDataObj);
    //ORDER IS IMPORTANT AND SPELLING TOO
    console.log(event);
}


// function createTaskEl(taskDataObj){

// 

function createTaskEl(taskDataObj){
    //dynamically creates a new <li> element inside existing HTML code
    var listItemEl = document.createElement("li");
    //assigning the CSS class to HTML element we created <li>
    listItemEl.className = "task-item";//not entering any text here just creating the list item to contain something inside it
    
    //create a <div> container in the HTML to store the task type 
    var taskInfoEl = document.createElement("div");
    //class for the <div> we created
    taskInfoEl.className = "task-info";

    //this will set up the dynamic injection of the HTML content into the newly created div to contain the tasktype
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //inject the innerHTML stored inside the variable taskInfoEl
    listItemEl.appendChild(taskInfoEl);

    //finally inject the <div> that contains all of the items that consist of the task-type that we want to inject
    //this will push the new list item Child element that we generated above into the HTML Parent element that we want it in.
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);

//buttonEl.addEventListener("click", createTaskHandler);
//console.log(buttonElement);