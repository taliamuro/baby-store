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

            //display everything if there is no input
            if (!input) {
                parseProducts(allProducts);
                return;
            }

            let results = [];

            //Search by gender
            if (input === "boy" || input === "girl") {
                results = allProducts.filter(p => p.gender.toLowerCase() === input);
            }



            //If no result, search by category
            if (results.length == 0) {

                //To know the id based on the name of teh category (IDs 1-5)
                const categoriesRef = [undefined, "clothing", "outerwear", "accessories", "shoes", "swimwear"];

                //Search by category
                let categoryId = -1; //just initializing
                for (let i = 1; i < categoriesRef.length; i++) {
                    if (categoriesRef[i].includes(input)) {
                        categoryId = i;
                        break;
                    }
                }

                //if we found a category:
                if (categoryId !== -1) {
                    results = allProducts.filter(product => product.category_id === categoryId);
                }
            }

            //If we still found nothing, search item titles:
            if (results.length == 0) {
                results = allProducts.filter(p =>
                p.item_title.toLowerCase().includes(input));
            }

            //if no result is found, search descriptions
            if (results.length == 0) {
                    results = allProducts.filter(p =>
                    p.description.toLowerCase().includes(input)
                );
            }

            //Display result
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
