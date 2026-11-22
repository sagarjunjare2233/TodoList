
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
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
