document.addEventListener('DOMContentLoaded', function()
{
    const userInputText = document.querySelector('.userInputText');
    const userInputButton = document.querySelector('.userInputButton');
    const taskList = document.querySelector('.task-list');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateTaskList()
    {
        taskList.innerHTML = '';
        savedTasks.forEach(function(taskText)
        {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="editTask">Edit</button>
                <button class="deleteTask">Delete</button>
            `;
            taskList.appendChild(taskItem);
            addTaskListeners(taskItem);
        });
        updateTaskListHeight();
    }

    function addTaskListeners(taskItem)
    {
        const editButton = taskItem.querySelector('.editTask');
        const deleteButton = taskItem.querySelector('.deleteTask');
        editButton.addEventListener('click', function()
        {
            const span = taskItem.querySelector('span');
            const newTaskText = prompt('Edit the task:', span.textContent);
            if (newTaskText !== null)
            {
                if (newTaskText.trim() !== '')
                {
                    span.textContent = newTaskText;
                    updateLocalStorage();
                    alert('Task edited successfully.');
                }
                else
                {
                    alert('Error: Task cannot be empty. Task not updated.');
                }
            }
        });
        deleteButton.addEventListener('click', function()
        {
            taskList.removeChild(taskItem);
            savedTasks.splice(savedTasks.indexOf(taskItem.querySelector('span').textContent), 1);
            updateLocalStorage();
            alert('Task deleted successfully.');
            updateTaskListHeight();
        });
    }
    userInputButton.addEventListener('click', function()
    {
        const taskText = userInputText.value.trim();
        if (taskText !== '')
        {
            savedTasks.push(taskText);
            updateLocalStorage();
            updateTaskList();
            userInputText.value = '';
        }
    });
    userInputText.addEventListener('keydown', function(event)
    {
        if (event.keyCode === 13)
        {
            event.preventDefault();
            userInputButton.click();
        }
    });

    function updateTaskListHeight()
    {
        const taskItems = taskList.querySelectorAll('li');
        let totalHeight = 0;
        taskItems.forEach(function(taskItem)
        {
            totalHeight += taskItem.offsetHeight;
        });
        taskList.style.height = totalHeight + 'px';
    }

    function updateLocalStorage()
    {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
    updateTaskList();
});