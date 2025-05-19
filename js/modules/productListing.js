// ES Module for implementing the product listing logic

export function initProductListing() {
    fetchProductsfromCatalog();
    // fetchProductsfromAPI();
}

export async function fetchProductsfromCatalog() {
    // console.log("Fetching products from catalog...");
    
    try {
        const response = await fetch('data/catalog.json');
        const data = await response.json();
        
        // console.log("Fetched data:", data);

        const products = data.products;

        // console.log("Fetched products:", products);
        

        if (Array.isArray(products)) {
            parseProducts(products);
        } else {
            throw new TypeError("products is not an array.");
            
        }
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}

export function parseProducts(products) {
    const container = document.getElementById("product-container");
    
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // const imageSrc = (product.images && product.images.length > 0) ? product.images[0] : "images/placeholder-image.jpeg";

        const itemId = product.item_id;

        card.innerHTML = `
            <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item_title"]}" height="250" width="190">
            <br>
            <a class="listing-title-link" id="${product["item_id"]}">${product["item_title"].length > 20 ? product["item_title"].substring(0,20) + '...' : product["item_title"]}</a>
            <p>$${product["unit_price"]}</p>
        `;

        container.appendChild(card);
        const link = document.getElementById(itemId);

        link.addEventListener('click', ()=>{
        //a) Read the value of the show id custom attribute   
            // console.log("link: " + link.item_title); //undefined
            // console.log(product.item_title);
        //b) Save it into local storage
        localStorage.setItem('clickedProduct', JSON.stringify(product));
        const storedProduct = JSON.parse(localStorage.getItem('clickedProduct'));
        console.log(storedProduct.item_title);
        //c) Redirect user to the details page
        link.setAttribute("href", "product-details.html");
        });
    });
}
