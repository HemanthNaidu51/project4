// Get the task input field, add task button, and task list
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li class="task ${task.completed ? 'completed' : ''}">
                <span>${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

// Add task event listener
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
});

// Edit task event listener
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const taskIndex = Array.prototype.indexOf.call(taskList.children, e.target.parentNode);
        const taskText = prompt('Edit task:', tasks[taskIndex].text);
        if (taskText) {
            tasks[taskIndex].text = taskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }
});

// Delete task event listener
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskIndex = Array.prototype.indexOf.call(taskList.children, e.target.parentNode);
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
});

// Complete task event listener
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        const taskIndex = Array.prototype.indexOf.call(taskList.children, e.target.parentNode);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
});

// Render tasks on page load
renderTasks();