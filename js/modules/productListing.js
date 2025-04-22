// ES Module for implementing the product listing logic

export function initProductListing() {
    fetchProducts();
}

export async function fetchProducts() {
    console.log("Fetching products...");
    
    try {
        const response = await fetch('data/catalog.json');
        const data = await response.json();
        
        console.log("Fetched data:", data);

        const products = data.products;

        console.log("Fetched products:", products);
        

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
        
        const imageSrc = (product.images && product.images.length > 0) ? product.images[0] : "images/placeholder-image.jpeg";

        card.innerHTML = `
            <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item-title"]}" height="350">
            <h3>${product["item_title"].length > 15 ? product["item_title"].substring(0,15) + '...' : product["item_title"]}</h3>
            <p>$${product["unit_price"]}</p>
        `;

        container.appendChild(card);
    });
}

fetchProducts();
