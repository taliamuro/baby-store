// ES Module for implementing the home logic
export function initHome() {
    
    const myCarouselElement = document.querySelector('#carouselAutoplaying')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 4000
    });

    handleSearch();
}

export function handleSearch() {
        const products = localStorage.getItem(JSON.parse('all-products'));

    // Get the input value
    const filter = document.getElementById('search-input').value.toLowerCase();

    // Get the table and rows
    // NOTE: The table's <tbody> ID is 'tbl-shows' and the input ID is 'searchInput'
    const table = document.getElementById('page-content');
    const rows = table.getElementsByTagName('tr');

    // Loop through all rows (starting from index 1 to skip header)
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        // Loop through all cells in the row and check if any cell contains the filter text.
        // The current implementation only checks the first column (index 0). However, you can modify it to check other columns as well.
        if (cells[0].textContent.toLowerCase().includes(filter)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}