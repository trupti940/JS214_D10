document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const sortSelect = document.getElementById('sort');

    // Function to fetch product data
    async function fetchProducts(sortBy = 'name') {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();

            // Sort products
            const sortedProducts = products.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            });

            displayProducts(sortedProducts);
        } catch (error) {
            console.error('Fetch error:', error);
            productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    // Function to display products
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p>Email: ${product.email}</p>
                <p>Phone: ${product.phone}</p>
                <p>Website: ${product.website}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    // Event listener for sorting
    sortSelect.addEventListener('change', () => {
        fetchProducts(sortSelect.value);
    });

    // Initial fetch
    fetchProducts();
});
