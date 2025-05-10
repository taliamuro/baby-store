// ES Module for implementing the cart logic

export function initCart() {

	loadCartItems();

	// let cartItems = JSON.parse(localStorage.getItem('cart-items'));

	const deleteItembtns = Array.from(document.getElementsByClassName('remove-button'));
	
	deleteItembtns.forEach(deleteItembtn => {

			deleteItembtn.addEventListener('click', () => {
			
			let cartItems = JSON.parse(localStorage.getItem('cart-items'));

			//Get the id of the button and extract the item's ID	
			const itemId = deleteItembtn.id.substring(12); //id = remove-item-${cartItem["item_id"]}

			//Set the new array without the item to delete
			const newCartItems = cartItems.filter(item => item.item_id != itemId);
			localStorage.setItem('cart-items', JSON.stringify(newCartItems));


			//Clear the products from the page
			const container = document.getElementById("ordered-products-table");
			container.innerHTML = ``;

			//Reload the products in the page with updates
			initCart();
		});
	});
} 


function loadCartItems() {

	let cartItems = JSON.parse(localStorage.getItem('cart-items'));


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
			<button class="remove-button" id="remove-item-${cartItem["item_id"]}"> 
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

	console.log("Cart Size: " + cartItems.length); 

}

