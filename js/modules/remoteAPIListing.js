export async function fetchProductsfromAPI() {
    console.log("Fetching products from API...");
    try {
        const uri = "https://api.escuelajs.co/api/v1/products";
        const products = await fetchData(uri);
        parseProducts(products);
    } catch (error) {
        console.error("Error loading products: ", error);
    }
}