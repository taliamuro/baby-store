// Importing ES Modules:
import {initCart} from "./modules/cart.js";
import {initContact} from "./modules/contact.js";
import {initHome} from "./modules/home.js";
import {initLogin} from "./modules/login.js";
import {initOrderConfirmation} from "./modules/orderConfirmation.js";
import {initProductDetails} from "./modules/productDetails.js";
import {fetchProducts} from "./modules/productListing.js";

// Ensure that the document is fully loaded and parsed
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("Initializing the app...");
    
    // Which page the user is visiting
    const page = document.querySelector("[data-page]").dataset.page;
    console.log("Current Page: " + page);
    switch (page) {
        case "cart":
            initCart();
            break;
        case "contact":
            initContact();
            break;
        case "home":
            initHome();
            break;
        case "login":
            initLogin();
            break;
        case "order-confirmation":
            initOrderConfirmation();
            break;
        case "product-details":
            initProductDetails();
            break;
        case "product-listing":
            fetchProducts();
            break;
        default:
            break;
    }
}

fetch("https://api.escuelajs.co/api/v1/products")
