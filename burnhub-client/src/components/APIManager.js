
export const FetchStores = async () => {
    const response = await fetch(`https://localhost:7069/Stores
    `);
    
    const storesArray = await response.json();
    return storesArray
}
//check before getting stores array check for success 

export const FetchItemsByStore = async (storeId) => {
    const response = await fetch(`https://localhost:7069/Items/store/${storeId}`)
    const storeItemsArray = await response.json();
    return storeItemsArray
}

export const AddStore = async (newStore) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStore)
    }

    await fetch(`https://localhost:7069/Stores`, options)
}

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
    const response = await fetch(`https://localhost:7069/Items/?searchCriterion=${criterion}`)
    const itemsArray = await response.json()
    return itemsArray
}

export const UpdateItem = async (id, item) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }
    await fetch(`https://localhost:7069/Items/${id}`, options)
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

export const UpdateUser = async (id, user) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    await fetch(`https://localhost:7069/Users/${id}`, options)
}

export const FetchOrdersByUserFirebaseId = async (firebaseId, orderComplete) => {
    const response = await fetch(`https://localhost:7069/Orders/byUser?userFirebaseId=${firebaseId}&complete=${orderComplete}`)
    const ordersArray = await response.json()
    return ordersArray
}

export const AddOrder = async (newOrder) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    }

    await fetch(`https://localhost:7069/Orders`, options)
}

export const UpdateOrder = async (id, order) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }
    await fetch(`https://localhost:7069/Orders/${id}`, options)
}

export const AddOrderItem = async (newOrderItem) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrderItem)
    }

    await fetch(`https://localhost:7069/OrderItems/addOrderItem`, options)
}

export const UpdateOrderItem = async (id, orderItemObj) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderItemObj)
    }
    await fetch(`https://localhost:7069/OrderItems/orderItem/${id}`, options)
}

export const DeleteOrderItem = async (id) => {
    await fetch(`https://localhost:7069/OrderItems/orderItem/${id}`, {
        method: "DELETE"
    })
}

export const GetCategories = async () => {
    const response = await fetch(`https://localhost:7069/Categories`)
    const categories = await response.json()
    return categories
}

export const FetchStoresBySearch = async (criterion) => {
    const response = await fetch(`https://localhost:7069/Stores/search?q=${criterion}`)
    const storesArray = await response.json()
    return storesArray
}

export const FetchPagedItems = async (pageNumber, pageSize, sortOrder, categoryId) => {
    const response = await fetch (`https://localhost:7069/Items/paged?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&categoryIds=${categoryId}`)
    const itemsArray = await response.json()
    return itemsArray
}

export const FetchItemsByCategory = async(categoryId) => {
    const response = await fetch(`https://localhost:7069/Items/?categoryId=${categoryId}`);
    const itemsByCategoryArray = await response.json();
    return itemsByCategoryArray
}