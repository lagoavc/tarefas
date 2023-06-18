// Function to add a new task
function addTask(taskName) {
    const task = {
        id: Date.now(),
        name: taskName,
        status: 0
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Function to remove a task
function removeTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
}

// Function to update the status of tasks
function updateTaskStatus(taskId, status) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = status;
        }
        return task;
    });
    saveTasks(tasks);
}

// Function to get tasks from local storage
function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render the task list
function renderTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = task.status ? 'Feito' : 'Por fazer';
        row.appendChild(statusCell);

        const actionsCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = task.id;
        actionsCell.appendChild(checkbox);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeTask(task.id);
            renderTaskList();
        });
        actionsCell.appendChild(removeButton);

        row.appendChild(actionsCell);
        taskList.appendChild(row);
    });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
        taskInput.value = '';
        renderTaskList();
    }
}

// Function to handle update button click
function handleUpdateButtonClick() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const taskId = parseInt(checkbox.value);
        updateTaskStatus(taskId, 1);
    });
    renderTaskList();
}

// Attach event listeners
document.getElementById('addTaskForm').addEventListener('submit', handleFormSubmit);
document.getElementById('updateButton').addEventListener('click', handleUpdateButtonClick);

// Initial rendering of the task list
renderTaskList();
