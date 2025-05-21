//implement the map functionality and load the content of places.json 
//and handle user interactions with the list of places
import {fetchData} from "./fetchWrapper.js";

export async function initMapView() {
    console.log("Initializing the map");

    //1) instantiate the leaflet map, then set the initial view
    const map = L.map('leaflet-map').setView([45.50602373900276, -73.6670893859262], 10);//latitiude, longetude then zoom level

    //2) Set the map layer:
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //3) markers 
    const marker = L.marker([45.50008003024627, -73.66258338964444]).addTo(map);

    //4) PopUps
    const placeInfo = `<h6>Royal Mount</h6>
                       <p> description </p>
                       <p> address </p>`;
    marker.bindPopup(placeInfo).openPopup();

    var greenIcon = L.icon({
        iconUrl: "markers/bus.png",
    
        iconSize:     [38, 95], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

    //5) use the fetchWrapper to load the content of places.json
    //a) Loop for each place, craete a marker on the map. (.places[])
    // const jsonPlaces = await fetchData("data/places.json");
    renderPlaces(map);

//     jsonPlaces.places.array.forEach(place => {
//         console.log("Place: " + place.name);
//     });
}

async function renderPlaces(map) {
    const locations = await fetchData("data/places.json");
    const listContainer = document.getElementById("places-list");

    locations.places.forEach(place => {

    //places list:
    const item = document.createElement("li");
    item.textContent = place.name;
    listContainer.appendChild(item);

    //Markers:
    const marker = L.marker(place.point.coordinates).addTo(map);

    //PopUps:
    const placeInfo = `<h6>${place.name}</h6>
                       <p>${place.description}</p>
                       `;
    marker.bindPopup(placeInfo).openPopup();

    //Markers Icons:
    const placeCategoryId = place.categoryId;
    const placeCategory = locations.categories.find(
        category => category.id == placeCategoryId); 

        const customMarker = L.icon({
            iconUrl: placeCategory.markerIcon,
            // shadowUrl: 'leaf-shadow.png',
        
            iconSize:     [40, 50], // size of the icon
            // shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    
        L.marker(place.point.coordinates, {icon: customMarker}).addTo(map);

        //when a name of place is clicked
        item.addEventListener("click", () => {
            marker.openPopup();
            map.setView([45.50602373900276, -73.6670893859262], 10); //reset view if the user has scrolled far
        });
});
}
