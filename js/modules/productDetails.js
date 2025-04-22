// ES Module for implementing the product details logic

export function initProductDetails() {
    document.addEventListener("DOMContentLoaded", async () => {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id"));

        try {
            const response = await fetch('data/catalog.json');
            const data = await response.json();
            const products = data.products;

            if (!products || isNaN(id) || !products[id]) {
                throw new Error("Invalid product ID");
            }

            const product = products[id];
            const container = document.getElementById("product-detail-container");

            container.innerHTML = `
                <h1>${product["item_title"]}</h1>
                <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item_title"]}" height="300">
                <p><strong>Price:</strong> $${product["unit_price"]}</p>
                <p><strong>Description:</strong> ${product["description"]}</p>
            `;
        } catch (error) {
            console.error("Failed to load product:", error);
            document.getElementById("product-detail-container").innerHTML = "<p>Product not found.</p>";
        }
    });
}

