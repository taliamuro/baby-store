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
            <img src="${(product.images && product.images[0]) || 'https://via.placeholder.com/300x200'}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
        `;

        container.appendChild(card);

        // // Creating card image
        // const img = document.createElement("img");
        // img.scr = product.images[0] || "https://via.placeholder.com/300x200";
        // img.className = "card-img-top";
        // img.alt = product.title;
        // card.appendChild(img);

        // // Creating card body
        // const cardBody = document.createElement("div");
        // cardBody.className = "card-body";

        // // Creating card title
        // const cardTitle = document.createElement("h5");
        // cardTitle.className = "card-title";
        // cardTitle.textContent = product.cardTitle;
        // cardBody.appendChild(cardTitle);

        // // Creating card text (Price)
        // const price = document.createElement("p");
        // price.className = "card-text";
        // price.textContent = `$${product.price}`;
        // cardBody.appendChild(price)

        // card.appendChild(cardBody);
        // container.appendChild(card);
    });
}

fetchProducts();
