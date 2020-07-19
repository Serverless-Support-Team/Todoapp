//Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listerners

loadEventlisteners();

//creating load all event listener function

function loadEventlisteners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //Remove task
  taskList.addEventListener("click", removeTask);
  //Clear all tasks
  clearBtn.addEventListener("click", clearTask);
  //Filter task event
  filter.addEventListener("keyup", filterTasks);
}

//Display Tasks

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //create text node and append li
    li.appendChild(document.createTextNode(task));
    //Create New link element
    const link = document.createElement("a");
    //Add class for the link
    link.className = "delete-item secondary-content";
    //Adding delete icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add tash function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create New link element
    const link = document.createElement("a");
    //Add class for the link
    link.className = "delete-item secondary-content";
    //Adding delete icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  }

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear task field
  taskInput.value = "";
  e.preventDefault();
}

//Store task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      //Remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//function to remove the list item
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  console.log(task);
  tasks.forEach(function (task, index) {
    tasks.splice(index, 1);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear task
function clearTask(e) {
  //taskList.innerHTML = "";
  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();

  function clearTaskFromLocalStorage() {
    localStorage.clear();
  }
}

//Filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection -item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });

  console.log(text);
}
