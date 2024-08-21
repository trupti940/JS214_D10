document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3500/tickets';
    const taskList = document.getElementById('task-list');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');

    let currentPage = 1;
    const itemsPerPage = 5;

    function getPriority(dueDate) {
        const now = new Date();
        const due = new Date(dueDate);
        const diff = (due - now) / 1000 / 60; // Difference in minutes

        if (diff <= 2) return 'High';
        if (diff <= 3) return 'Medium';
        return 'Low';
    }

    async function fetchTasks(page = 1, status = '', priority = '') {
        try {
            const response = await fetch(`${apiUrl}?_page=${page}&_limit=${itemsPerPage}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            displayTasks(data);
        } catch (error) {
            console.error('Fetch error:', error);
            taskList.innerHTML = '<p>Error loading tasks. Please try again later.</p>';
        }
    }

    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const priority = getPriority(task.dueDate);
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `
                <h2>${task.title} - <span class="priority">${priority}</span></h2>
                <p>Status: ${task.status}</p>
                <p>Description: ${task.description}</p>
                <p>Due Date: ${new Date(task.dueDate).toLocaleString()}</p>
            `;
            taskList.appendChild(taskDiv);
        });
    }

    async function updatePage() {
        const status = statusFilter.value;
        const priority = priorityFilter.value;
        await fetchTasks(currentPage, status, priority);
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    nextPageButton.addEventListener('click', () => {
        currentPage++;
        updatePage();
    });

    statusFilter.addEventListener('change', updatePage);
    priorityFilter.addEventListener('change', updatePage);

    updatePage(); // Initial fetch
});
