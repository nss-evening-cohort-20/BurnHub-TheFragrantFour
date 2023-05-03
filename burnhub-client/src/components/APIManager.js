export const FetchItems = async () => {
    const response = await fetch(`https://localhost:7069/Items`);
    const itemsArray = await response.json();
    return itemsArray
}