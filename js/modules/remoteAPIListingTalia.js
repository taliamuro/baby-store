import { fetchData } from "./fetchWrapper.js";

export function initRemoteAPIListingTalia(params) {
    fetchProductsfromAPI();
}

export async function fetchProductsfromAPI() {
    console.log("Fetching products from API...");
    try {
        const uri = "https://api.escuelajs.co/api/v1/products";
        const products = await fetchData(uri);
        parseProducts(products);
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}

export function parseProducts(products) {
    console.log(products);
    const container = document.getElementById("product-container");
    
    products.forEach((product, index) => {
        const card = document.createElement("div");//add a section
        card.className = "product-card";//We need a class name to style it
        
        const imageSrc = "images/placeholder-image.jpeg";//Adding placeholder image
        
        card.innerHTML = `
            <img src="${product.images[1] || 'https://via.placeholder.com/300x200'}" alt="${product.title}" height="350">
            <h5><a class="listing-description-preview" href="product-details.html?id=${index}">${product.title.length > 20 ? product.title.substring(0,20) + '...' : product.title}</h5>
            <p>$${product.price}</p>
        `;

        container.appendChild(card);
    });
}