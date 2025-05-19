import { fetchData } from "./fetchWrapper.js";

export function initRemoteAPIListingTalia(params) {
    fetchProductsfromAPI();
}

export async function fetchProductsfromAPI() {
    console.log("Fetching products from API...");
    try {
        const uri = "https://dummyjson.com/products";
        const data = await fetchData(uri);
        const products = data.products;
        parseProducts(products);
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}

export function parseProducts(products) {
    console.log(products);
    const container = document.getElementById("product-container");
    
    products.forEach((product) => {
        const card = document.createElement("div");//add a section
        card.className = "product-card";//We need a class name to style it
        
        const imageSrc = "images/placeholder-image.jpeg";//Adding placeholder image
        
        card.innerHTML = `
            <img src="${product.images[0] || 'https://via.placeholder.com/300x200'}" alt="${product.title}" height="350">
            <h5><a class="listing-description-preview" id="${product["id"]}">${product["title"]}</a></h5>
        `;

        container.appendChild(card);
    });
}
