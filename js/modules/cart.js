// ES Module for implementing the cart logic

export function initCart() {
	let cartItems = JSON.parse(localStorage.getItem('cart-items'));

    const container = document.getElementById("ordered-products-table");

    const cartProduct = JSON.parse(localStorage.getItem('cartItem'));
    console.log("Product in cart: " + cartProduct.item_title);


	
    container.innerHTML = `
			<tr>
				<td>
			<img src="${cartProduct["thumbnail_img"]}" height="220" width="145" class="featured-items">
				</td>
				<td>
			<div class="cart-description">
				<p><b>${cartProduct["item_title"]}</b></p>
				<p>Colour</p>
				<p>Size</p>
				<p>Price: $${cartProduct["unit_price"]}</p>
			</div>
				</td>
				<td>
			<div class="cart-quantity">
				<button class="remove-button">
					<img src="images/trash.svg" alt="">
				</button>
				<input class="quantity" type="text" value="1" size="1">
				<button class="add-button">
					<img src="images/plus.svg" alt="">
				</button>
			</div>
				</td>
			</tr>
    `;


	cartItems.forEach(cartItem => {
		container.innerHTML = `
		<tr>
			<td>
		<img src="${cartItem["thumbnail_img"]}" height="220" width="145" class="featured-items">
			</td>
			<td>
		<div class="cart-description">
			<p><b>${cartItem["item_title"]}</b></p>
			<p>Colour</p>
			<p>Size</p>
			<p>Price: $${cartItem["unit_price"]}</p>
		</div>
			</td>
			<td>
		<div class="cart-quantity">
			<button class="remove-button">
				<img src="images/trash.svg" alt="">
			</button>
			<input class="quantity" type="text" value="1" size="1">
			<button class="add-button">
				<img src="images/plus.svg" alt="">
			</button>
		</div>
			</td>
		</tr>
`;
	});
	// <img src="${storedProduct["thumbnail_img"] || 'https://via.placeholder.com/300x200'}" alt="${storedProduct["item-title"]}" height="250" width="190">
	// <div id="product-description">
	// <h2>${storedProduct["item_title"]}</h2>
	// <p>$${storedProduct["unit_price"]}</p>
	// <h5>Description</h5>
	// <p>${storedProduct["description"]}</p>
	// <a id="add-to-cart-link"><button type="button" class="btn btn-primary" id="add-to-cart-btn">Add To Cart</button></a>
	// </div>
}

