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
    
        const itemIdx = cartItems.findIndex(item => item.item_id === storedProduct.item_id);
        
        //If the product is already added to the cart, just increase its quantity;    
        if(itemIdx >= 0) //Or != -1 
        {             
            // Update the product's qtt to buy (item is already in the cart):
            //First, find the index, then update the item form the array using the index
            // const itemIdx = cartItems.findIndex(item => item.item_id === storedProduct.item_id);

            cartItems[itemIdx].qty_to_buy += 1;

            console.log("Quantity to buy: " + storedProduct.qty_to_buy);

            const addToCartAlert = document.getElementById("add-to-cart-alert");
            addToCartAlert.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Item has been successfully added to cart!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
        }
 
        else 
        {
            //Update the product's qtt to buy:
            storedProduct.qty_to_buy = 1;
 
            console.log("Quantity to buy: " + storedProduct.qty_to_buy);
 
            // Store product in cart as a cart item:
            cartItems.push(storedProduct);
 
            console.log("Cart products: " + cartItems.length);
 
            //  Redirect user
            //  link.setAttribute("href", "cart.html");
        }

        //After everything, update the cart in local storage:
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
      });   
}
