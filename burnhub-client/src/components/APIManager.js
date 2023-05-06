
export const FetchStores = async () => {
    const response = await fetch(`https://localhost:7069/AllStores`);
    const storesArray = await response.json();
    return storesArray
}

export const FetchStore = async (storeId) => {
    const response = await fetch(`https://localhost:7069/AllStores/${storeId}`)
    const store = await response.json();
    return store
}