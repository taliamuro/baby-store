// ES Module for implementing the product details logic
export function initProductDetails() {

    let cartItems = JSON.parse(localStorage.getItem('cart-items'));
    
    const container = document.getElementById("product-detail-container");

    const storedProduct = JSON.parse(localStorage.getItem('clickedProduct'));
    
    console.log("Displayed product: " + storedProduct.item_title);

    container.innerHTML = `
        <img src="${storedProduct["thumbnail_img"]}" alt="${storedProduct["item-title"]}" height="250" width="190">
        <div id="product-description">
        <h2>${storedProduct["item_title"]}</h2>
        <p>$${storedProduct["unit_price"]}</p>
        <h5>Description</h5>
        <p>${storedProduct["description"]}</p>
        <a id="add-to-cart-link"><button type="button" class="btn btn-primary" id="add-to-cart-btn">Add To Cart</button></a>
        </div>
        `;

    const link = document.getElementById("add-to-cart-link");

    link.addEventListener('click', ()=>{

    // const cartItem = JSON.stringify(storedProduct); 

    // Store product in cart as a cart item:

    cartItems.push(storedProduct);
    localStorage.setItem('cart-items', JSON.stringify(cartItems));

    console.log("Cart products: " + cartItems.length);

    //  Redirect user
    //  link.setAttribute("href", "cart.html");

    });   
} 

