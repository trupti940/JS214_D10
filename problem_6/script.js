document.getElementById('fetch-todos').addEventListener('click', fetchTodos);

let currentPage = 1;
const limit = 10; // Number of todos per page

async function fetchTodos(page = 1) {
    currentPage = page;
    const url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const todos = await response.json();

        displayTodos(todos);
        setupPagination();
    } catch (error) {
        console.error('Something went wrong:', error);
        document.getElementById('container').innerHTML = `<p>Something went wrong: ${error.message}</p>`;
    }
}

function displayTodos(todos) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${todo.title}</span>
            <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
        `;
        container.appendChild(todoItem);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= 20; i++) { // Assuming there are 200 todos and 10 todos per page
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => fetchTodos(i));
        paginationContainer.appendChild(button);
    }
}
