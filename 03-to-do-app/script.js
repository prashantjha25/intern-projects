//Assumptions: The tasks are unique by their name only without case sesitive.

const submitBtn = document.getElementById("taskSubmitButtonId");
const pendingTaskConatiner = document.getElementById('pendingtaskId');
const completedTaskConatiner = document.getElementById('completedtaskId');

//to-do task
let tasks = [];

const checkTaskValidity = (taskName) => {
    let containsAlphabetsOrSpaceOnly = true;
    for(index in taskName){
        // console.log(ch);
        
        if((taskName[index] >= 'A' && taskName[index] <= 'Z') || (taskName[index] >= 'a' && taskName[index] <= 'z') || (taskName[index] === ' ')){
            continue;
        }
        containsAlphabetsOrSpaceOnly = false;
        break;
    }
    return taskName && taskName.length > 0 && containsAlphabetsOrSpaceOnly;
}

function deleteTask(taskName){
    tasks = tasks.filter(task => task.name != taskName);
    renderTask(tasks.filter(task => task.status === false), pendingTaskConatiner);
    renderTask(tasks.filter(task => task.status === true), completedTaskConatiner);
} 

function completeTask(taskName){
    tasks = tasks.map(task => {
        if(task.status === false && task.name === taskName){
            task.status = true;
        }
        return task;
    });
    renderTask(tasks.filter(task => task.status === false), pendingTaskConatiner);
    renderTask(tasks.filter(task => task.status === true), completedTaskConatiner);
}

const renderTask = (tasks, container) => {
    container.innerHTML = '';
    tasks.forEach(task => { 
        container.innerHTML += `<li>
                        <div>
                            <label>${task?.name}</label>
                            <input type="checkbox" name="${task?.name}" ${task?.status && "checked"} ${task?.status && "disabled"} onchange='completeTask("${task?.name}")'/>
                            <button onclick='deleteTask("${task?.name}")'>Trash</button>
                        </div>
                    </li>`;
    });
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); //prevent the default behaviour of task form 

    const taskForm = new FormData(document.forms.taskForm); //get the form data in object format by id
    const taskName = taskForm.get('task').trim().toLowerCase(); //to-do task(string)

    if (checkTaskValidity(taskName) && !tasks.find(task => task.name === taskName && task.status === false)) { //validating the task
        tasks.push({ name: taskName, status: false });
        renderTask(tasks.filter(task => task.status === false), pendingTaskConatiner);
    }
})






