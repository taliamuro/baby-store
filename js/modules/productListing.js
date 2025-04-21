// ES Module for implementing the product listing logic
export async function fetchShows() {
    console.log("Fetching products...");
    const uri = "https://api.escuelajs.co/api/v1/products";
    const products = await fetchProducts(uri);
}

export function parseProducts(products) {
    products.array.forEach(product => {
        
    });
}

function createNewElement(parent, elemName, content) {
    const newElem = document.createElement(elemName);
    newElem.textContent = content;
    parent.appendChiled(newElem);
    return newElem;
}