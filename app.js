// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all eventlisteners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task list
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from ls
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append it to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // add icon item
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append to ul
        taskList.appendChild(li);

    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //create li elements
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // add icon item
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append to ul
    taskList.appendChild(li);

    // store in ls
    storeTaskInLS(taskInput.value)
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

//store task
function storeTaskInLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Remove task function
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement)
        }
    }
}
function removeTaskFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,i){
        if(taskItem.textContent === task){
            tasks.splice(i,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function clearTasks() {
    // taskList.innerHTML = '';

    // faster method
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLS();
}
function clearTasksFromLS(){
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}