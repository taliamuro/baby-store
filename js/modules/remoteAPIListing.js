import { fetchData } from "./fetchWrapper.js";

export function initRemoteAPIListing(params) {
    fetchFromAPI();
}

export async function fetchFromAPI() {
    try {
        const uri = "https://date.nager.at/api/v3/PublicHolidays/2024/CH";
        const cats = await fetchData(uri);
        parseProducts(cats);
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}

export function parseProducts(holidays) {
    const container = document.getElementById("holiday-container");

    holidays.forEach((holiday) => {
        const card = document.createElement("div");
        card.className = "holiday-card";

        card.innerHTML = `
            <h3>${holiday.name}</h3>
            <p><strong>Date:<u></strong> ${holiday.date}</u></p>
            <p>Local Name: <em>${holiday.localName}</em></p>
        `;

        container.appendChild(card);
    });
}
