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

				//Get the index for the qtt update
				const itemIdx = cartItems.findIndex(item => item.item_id == itemId);

				let qttInCart = cartItems[itemIdx].qty_to_buy;

				//If the quantity of the product to buy is > 1, only only decrease the qtt to buy:
				if(qttInCart > 1) 
				{
					cartItems[itemIdx].qty_to_buy -= 1;
					localStorage.setItem('cart-items', JSON.stringify(cartItems));
				} 

				//Else, remove the item from the cart listing:
				else
				{
				//Set the new array without the item to delete
				const newCartItems = cartItems.filter(item => item.item_id != itemId);
				localStorage.setItem('cart-items', JSON.stringify(newCartItems));

				}

				//Clear the products from the page
				const container = document.getElementById("ordered-products-table");
				container.innerHTML = ``;
				
				//Reload the products in the page with updates
				initCart();
			});
	});
	
	const plusButtons = Array.from(document.getElementsByClassName('add-button'));

	plusButtons.forEach(plusBtn => {
		plusBtn.addEventListener('click', () => {
			let cartItems = JSON.parse(localStorage.getItem('cart-items'));

			//Get the id of the button and extract the item's ID	
			const itemId = plusBtn.id.substring(19);

			//Get the index for the qtt update
			const itemIdx = cartItems.findIndex(item => item.item_id == itemId);

			cartItems[itemIdx].qty_to_buy += 1;
			localStorage.setItem('cart-items', JSON.stringify(cartItems));	
			
			//Clear the products from the page
			const container = document.getElementById("ordered-products-table");
			container.innerHTML = ``;
			
			//Reload the products in the page with updates
			initCart();
		});
	});

	//href="order-confirmation.html"
	const placeOrderLink = document.getElementById('place-order-link');

	placeOrderLink.addEventListener('click', () => {
		let cartItems = JSON.parse(localStorage.getItem('cart-items'));
		let canBuy = true;

		cartItems.forEach(cartItem => {
			if(cartItem.qty_to_buy > cartItem.qty_in_stock) {
				console.log("Cannot order the quantity you need, we only have: " + cartItem.qty_in_stock);
				canBuy = false;
			}
		});

		//Redirect to the order confirmation page:
		if(canBuy) {
			placeOrderLink.setAttribute("href", "order-confirmation.html");
		} else {
			console.log("can't buy");
		}
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
			<p>Size</p> 
			<p>Price: $${cartItem["unit_price"]}</p>
		</div>
			</td>
			<td> 
		<div class="cart-quantity">  
			<button class="remove-button" id="remove-item-${cartItem["item_id"]}"> 
				<img src="images/trash.svg" alt=""> 
			</button>
			<input class="quantity" id="increment-item-value-${cartItem["item_id"]}" type="text" value="${cartItem["qty_to_buy"]}" size="1">
			<button class="add-button" id="increment-item-btn-${cartItem["item_id"]}">
				<img src="images/plus.svg" alt="">
			</button>
		</div>
			</td>
		</tr>
	`;
	}); 
	console.log("Cart Size: " + cartItems.length); 
}
