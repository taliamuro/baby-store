// ES Module for implementing the product listing logic

export function initProductListing() {
    fetchProductsfromCatalog();
    search();
    // fetchProductsfromAPI();
}

let allProducts = [];

export async function fetchProductsfromCatalog() {
    // console.log("Fetching products from catalog...");
    
    try {
        const response = await fetch('data/catalog.json');
        const data = await response.json();
        
        // console.log("Fetched data:", data);

        allProducts = data.products;

        // console.log("Fetched products:", products);
        
        parseProducts(allProducts);
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}

function search() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    console.log("Search button: ", searchBtn);
    console.log("Search input: ", searchInput);

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            const input = searchInput.value.trim().toLowerCase();
            console.log("Searching for: ", input);
            const results = allProducts.filter(p =>
                p.item_title.toLowerCase().includes(input) ||
                p.description.toLowerCase().includes(input) ||
                (p.category && p.category.category_name && p.category.category_name.toLowerCase().includes(input))
            );
            parseProducts(results);
        });
    }
    else {
        console.log("Search input or button not found in DOM");
    }
}

export function parseProducts(products) {
    const container = document.getElementById("product-container");
    // Clear previous listings
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `<p>No Results Found.</p>`;
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement("a");
        card.href = "product-details.html";
        card.className = "product-card";
        card.style.textDecoration = "none";
        
        // const imageSrc = (product.images && product.images.length > 0) ? product.images[0] : "images/placeholder-image.jpeg";

        // const itemId = product.item_id;

        card.innerHTML = `
            <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item_title"]}" height="250" width="190">
            <br>
            <div class="card-body">
                <h5 class="listing-title-link">${product["item_title"].length > 15 ? product["item_title"].substring(0,15) + '...' : product["item_title"]}</h5>
                <p>$${product["unit_price"]}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            localStorage.setItem('clickedProduct', JSON.stringify(product));
            window.location.href = "product-details.html"
        })

        container.appendChild(card);
        // const link = document.getElementById(itemId);
        const link = card.querySelector(".listing-title-link");

        link.addEventListener('click', (event)=>{
            event.preventDefault();
        //a) Read the value of the show id custom attribute   
            // console.log("link: " + link.item_title); //undefined
            // console.log(product.item_title);
        //b) Save it into local storage
        localStorage.setItem('clickedProduct', JSON.stringify(product));

        // confirm it is stored
        const storedProduct = JSON.parse(localStorage.getItem('clickedProduct'));
        console.log(storedProduct.item_title);
        //c) Redirect user to the details page
        // link.setAttribute("href", "product-details.html");
        window.location.href = "product-details.html";
        });
    });
}
