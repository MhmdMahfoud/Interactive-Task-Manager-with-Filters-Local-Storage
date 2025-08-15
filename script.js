const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list"); 

const errorMsg = document.querySelector(".error-msg");   
const filterButtons = document.querySelectorAll(".filters button");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = "";}
    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        const span = document.createElement("span");
        span.textContent = task.text;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = !task.completed; // Toggle status
            saveTasks();
            renderTasks();
        });
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.background = "#ffc107"; // Yellow
        editBtn.addEventListener("click", () => editTask(index));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.background = "#dc3545"; // Red
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1); 
            saveTasks();
            renderTasks();
        });
        li.append(checkbox, span, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
}
function editTask(index) {
    const li = taskList.children[index]; 
    const task = tasks[index];
    li.innerHTML = ""; 

