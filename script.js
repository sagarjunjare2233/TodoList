
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearBtn = document.getElementById("clearBtn");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

let searchText = "";
let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        if (!task.text.toLowerCase().includes(searchText.toLowerCase())) {
    return;
}
        if (currentFilter === "pending" && task.completed) {
    return;
}

if (currentFilter === "completed" && !task.completed) {
    return;
}
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {
            const updatedTask = prompt("Edit your task:", task.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {
                tasks[index].text = updatedTask.trim();
                saveTasks();
                displayTasks();
            }
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    const completedTasks = tasks.filter(task => task.completed).length;

    taskCounter.textContent =
        `Total Tasks: ${tasks.length} | Completed: ${completedTasks}`;
    
        totalCount.textContent = tasks.length;

    completedCount.textContent = completedTasks;

pendingCount.textContent = tasks.length - completedTasks;
const progress = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

progressText.textContent = progress + "%";
progressFill.style.width = progress + "%";
}


addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();
    taskInput.value = "";
});

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

clearBtn.addEventListener("click", function() {
    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

displayTasks();
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});

// Search Functionality
searchInput.addEventListener("input", function() {
    searchText = searchInput.value;
    displayTasks();
});