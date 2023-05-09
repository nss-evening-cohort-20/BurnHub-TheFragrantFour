
export const FetchStore = async (storeId) => {
    const response = await fetch(`https://localhost:7069/AllStores/${storeId}`)
    const store = await response.json();
    return store
}
export const FetchItem = async (itemId) => {
    const response = await fetch(`https://localhost:7069/Items/${itemId}`)
    const item = await response.json();
    return item
}