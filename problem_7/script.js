// Initial setup for fetching user data
let currentPage = 1;
const limit = 6; // Number of users per page

// Fetch user data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(currentPage);
    setupPagination();
});

async function fetchUsers(page = 1) {
    const url = `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Something went wrong:', error);
        document.getElementById('user-container').innerHTML = `<p>Something went wrong: ${error.message}</p>`;
    }
}

function displayUsers(users) {
    const container = document.getElementById('user-container');
    container.innerHTML = ''; // Clear previous data

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;
        container.appendChild(userCard);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // Assuming 10 pages based on available data (assuming 60 users in total)
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            fetchUsers(i);
            currentPage = i;
        });
        paginationContainer.appendChild(button);
    }
}
