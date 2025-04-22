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
    
    products.forEach((product, index) => {
        const card = document.createElement("div");//add a section
        card.className = "product-card";//We need a class name to style it
        
        const imageSrc = "images/placeholder-image.jpeg";//Adding placeholder image
        
        card.innerHTML = `
            <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item-title"]}" height="350">
            <h3><a href="product-details.html?id=${index}">${product["item_title"].length > 15 ? product["item_title"].substring(0,15) + '...' : product["item_title"]}</h3>
            <p>$${product["unit_price"]}</p>
        `;

        container.appendChild(card);
    });
}

// fetchProducts();
