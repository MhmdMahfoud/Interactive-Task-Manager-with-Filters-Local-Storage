const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
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
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.background = "#ffc107";
        editBtn.addEventListener("click", () => editTask(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.background = "#dc3545";
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

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
        if (input.value.trim() === "") {
            alert("Task cannot be empty");
            return;
        }
        task.text = input.value.trim();
        saveTasks();
        renderTasks();
    });

    li.appendChild(input);
    li.appendChild(saveBtn);
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (taskInput.value.trim() === "") {
        errorMsg.textContent = "Please enter a task";
        return;
    }
    errorMsg.textContent = "";
    tasks.push({ text: taskInput.value.trim(), completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();
