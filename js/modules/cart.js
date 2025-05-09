// ES Module for implementing the cart logic
export function initCart() {
	let cartItems = JSON.parse(localStorage.getItem('cart-items'));

	console.log("Cart: " + cartItems.length);

    const container = document.getElementById("ordered-products-table");

	cartItems.forEach(cartItem => {
		container.innerHTML += `
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
	
} 