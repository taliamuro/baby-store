export async function fetchData(resourceUri) {
    try {
        // 1. Initiate an HTTP request message.
        const response = await fetch(resourceUri);

        // 2. Validate the response
        if (!response.ok) {
            // Request failed
            throw new Error(`The request was not good ${response.status}`);
        }

        // 3. Retrieve the received payload from the response message
        const data = await response.json();
        return data;
        // 4. Parse and render the HTML table
    } catch (error) {
        console.log(error.message);
    }
}