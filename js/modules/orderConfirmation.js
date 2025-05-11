// ES Module for implementing the order confirmation logic

export function initOrderConfirmation() 
{
	const orders =  JSON.parse(localStorage.getItem('orders'));
    console.log(orders.length);
}
