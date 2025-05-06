// ES Module for implementing the product details logic

export function initProductDetails() {
    document.ad  dEventListener("DOMContentLoaded", async () => {
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
                <img src="${product["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${product["item_title"]}" height="300">
                <div id="product-description">
                    <h2>${product["item_title"]}</h2>
                    <p>$${product["unit_price"]}</p>
                    <h5>Description</h5>
                    <p>${product["description"]}</p>
                    <button type="button" class="btn btn-primary" id="add-to-cart-btn">Add To Cart</button>
                </div>
            `;

            const addToCartbtn = document.getElementById("add-to-cart-btn");
            addToCartbtn.addEventListener('click', (event)=> {
                
            });

        } catch (error) {
            console.error("Failed to load product:", error);
            document.getElementById("product-detail-container").innerHTML = "<p>Product not found.</p>";
        }
        // console.log(localStorage.getItem('clickedItem')); //Works
    });
}
