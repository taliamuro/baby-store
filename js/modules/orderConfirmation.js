// ES Module for implementing the order confirmation logic

export function initOrderConfirmation() 
{
	document.addEventListener("DOMContentLoaded", () => {
        confirmedOrder.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${product.thumbnail_img}" alt="${product.item_title}" height="125" width="75">
                </td>
                <td class="cart-description">
                    <h3><b>${product.item_title}</b></h3>
                    <p>Qty: ${product.qty_to_buy}</p>
                    <p>Price: $${(product.unit_price * product.qty_to_buy).toFixed(2)}</p>
                </td>
            `;
            table.appendChild(row);
        });
    });
}
