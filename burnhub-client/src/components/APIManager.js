export const FetchItems = async () => {
    const response = await fetch(`https://localhost:7069/Items`);
    const itemsArray = await response.json();
    return itemsArray
}

export const FetchItem = async (itemId) => {
    const response = await fetch(`https://localhost:7069/Items/${itemId}`)
    const item = await response.json();
    return item
}

export const FetchItemsBySearch = async (criterion) => {
    const response = await fetch(`https://localhost:7069/Items/search?q=${criterion}`)
    const itemsArray = await response.json()
    return itemsArray
}

export const FetchUserByFirebaseId = async (uid) => {
    const response = await fetch(`https://localhost:7069/Users/uid/${uid}`)
    const user = await response.json();
    return user
}

export const AddUser = async (userObj) => {
    // event.preventDefault()

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    await fetch(`https://localhost:7069/Users`, options)
}

export const FetchStoresBySearch = async (criterion) => {
    const response = await fetch(`https://localhost:7069/Stores/search?q=${criterion}`)
    const storesArray = await response.json()
    return storesArray
}