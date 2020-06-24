console.dir(window.document);

var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskNameInput = document.querySelector("input[name='task-name']");
var taskIdCounter = 0;
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
//taskNameInput = "here is the string stored in taskNameInput variable";
//check if its working  
//console.log(taskNameInput);

//function that handles the event of clicking which injects the content into a section
function taskFormHandler(event){
    event.preventDefault();
    
    //cool it works. this will store whatever value we type into the text field to be stored into this variable.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //checking if its working
    console.log("taskNameInput has been assigned a value!!");
    console.dir(taskNameInput);
    //this is attaching the task type that we select from the dropdown menu 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log("taskTypeInput has been assigned a value!!");
    console.log(taskTypeInput);//check if its storing correctly
    
    
    
    //checking if the form is in edit mode true or false
    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log("below this log is saying its true or false that we are in EDIT MODE:")
    //console.log(isEdit);
    if(isEdit){//if true we are in EDIT MODE
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    //if no data attribute, create the object as normal and pass to createTaskEl() function
    } else {// if isEdit is false we are NOT in EDIT MODE 
        //package up data as an object
        //this is passed into the parameter (event) from the function argument below (taskDataObj)
        var taskDataObj =
        {
            name: taskNameInput,
            type: taskTypeInput
            
        };
        createTaskEl(taskDataObj);
        //ORDER IS IMPORTANT AND SPELLING TOO
        console.log(event);
    }
    //check if input values are empty strings
    //if the strings entered are NOT filled out or empty it is considered a falsy value
    //if its NOT true that a string is entered essentially
    if(!taskNameInput || !taskTypeInput){
        alert("You need to enter something to submit into the task form.")
        formEl.reset();//this must be placed before the return statement!!`
        return false;
    }
}

function taskStatusChangeHandler(event){
    //get the task items id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //if the item inside the dropdown menu is selected then...
    //append the children elements with the data inside to the parent element specified
    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
}

function completeEditTask(taskName, taskType, taskId){
    //making sure that this function is getting the data it needs
    //console.log("making sure that this complete edit function is getting the data it needs:")
    //console.log(taskName, taskType, taskId);

    //find the matching task list item by its CSS class name and task id number
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values to the textContent in the dynamically generated HTML elements with their JS assigned class names
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    console.log("Task Updated!");

    //reset the form by removing the task ID and changing the button text back to normal after Saving the task
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

}

function createTaskEl(taskDataObj){
    //dynamically creates a new <li> element inside existing HTML code
    var listItemEl = document.createElement("li");
    //assigning the CSS class to HTML element we created <li>
    listItemEl.className = "task-item";//not entering any text here just creating the list item to contain something inside it
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //listItemEl.textContent = "Task # " + taskIdCounter;
    console.log("task Id: " + taskIdCounter);

    //create a <div> container in the HTML to store the task type 
    var taskInfoEl = document.createElement("div");
    //class for the <div> we created
    taskInfoEl.className = "task-info";
    //this will set up the dynamic injection of the HTML content into the newly created div to contain the tasktype
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    //inject the innerHTML stored inside the variable taskInfoEl
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);
    //finally inject the <div> that contains all of the items that consist of the task-type that we want to inject
    //this will push the new list item Child element that we generated above into the HTML Parent element that we want it in.
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
}

function createTaskActions(taskId){
    //create container for these new task actions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"]

    for (var i = 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
}

//handles checking the target clicking of the different target elements by their css class name 
function taskButtonHandler(event){
    //check if the event of clicking the button works
    console.log(event.target);

    //get target element from an event
    var targetEl = event.target;

    //check if edit button was clicked, if true was clicked run editTask function on the taskId
    if (targetEl.matches(".edit-btn")){
        console.log("you clicked an edit button!");
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //check if delete button was clicked, if true was clicked run deleteTask function on the taskId 
    else if (event.target.matches(".delete-btn")){
        console.log("you clicked a delete button!");
        //get the element's task id and print it to the console
        var taskId = event.target.getAttribute("data-task-id");
        //console.log("task button handler is showing this element's task id: " + taskId);
        //call delete task function
        deleteTask(taskId);
        
    }
}

function editTask(taskId){
    //get task list item element to edit
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //check to see if function is getting the task id by clicking the edit button
    console.log("editing task #: " + taskId);
    //get our javascript defined textContent from task name and type based on their CSS class selector name that we assigned it previously
    //keep in mind the <h3> and <span> were dynamically generated in JavaScript! These are not natively in the HTML!
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log("editing taskName: ");
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log("editing taskType: ");
    console.log(taskType);

    //make it clear to the user that the form is now in "edit mode"
    //changing the textContent within the element of the native HTML document that has the id="#save-task"
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);

}


function deleteTask(taskId){
    //get the task list item element to delete
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //console.log("console logging the taskSelected which to delete: ");
    //have to console log this separately otherwise chrome shows taskSelected as HTMLLIObject if concatted with the string in the same console log
    //console.log(taskSelected);
    //this is simply getting the attribute to display the data-task-id of the task item's delete button
    //var taskId = event.target.getAttribute("data-task-id");
    //console.log("called the function delete task for the task id: " + taskId);
    
    //this will remove the task-item but the 
    taskSelected.remove();
}
//submit the task into the form via clicking the Add Task button
formEl.addEventListener("submit", taskFormHandler);

//handles the buttons inside the task box containing the task name and the buttons for edit delete 
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
//buttonEl.addEventListener("click", createTaskHandler);
//console.log(buttonElement);