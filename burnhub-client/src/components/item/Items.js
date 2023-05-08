import { useState, useEffect } from "react"
import { FetchItems } from "../APIManager"
import { ItemCard } from "./ItemCard"

export const Items = ({ itemCategory }) => {

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const fetchItems = async () => {
        const itemsArray = await FetchItems()
        setItems(itemsArray)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        if (itemCategory) {
            const categoryTickets = items.filter(
                (item) => item.categoryId === 1
            );
            setFilteredItems(categoryTickets);
        } else {
            setFilteredItems(items);
        }
    }, [itemCategory])

    return (

        <main>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {filteredItems.map((item) => {
                            return (
                                <ItemCard
                                    itemId={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </main>

    )
}