import { useState, useEffect } from "react"
import { FetchItems, FetchItemsBySearch } from "../APIManager"
import { ItemCard } from "./ItemCard"
import { useParams } from "react-router"

export const Items = () => {

    const {searchCriterion} = useParams()
    const [items, setItems] = useState([])

    const fetchItems = async () => {
        const itemsArray = await FetchItems()
        setItems(itemsArray)
    }

    const getItemsFromSearch = async () => {
        const itemsArray = await FetchItemsBySearch(searchCriterion)
        setItems(itemsArray)
    }

    const searchCountMessage = () => {
        if (items.length === 1) {
            return `1 result found for "${searchCriterion}".`
        } else {
            return `${items.length} results found for "${searchCriterion}".`
        }
    }

    useEffect(() => {
        if (searchCriterion) {
            getItemsFromSearch()
        } else {
            fetchItems()
        }
    }, [searchCriterion])

    return (

        <main>

            <div className="bg-white">
                {
                    searchCriterion
                        ? <div className="text-center pt-2">{searchCountMessage()}</div>
                        : ""
                }
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {items.map((item) => {
                            return (
                                <ItemCard
                                    key={`item--${item.id}`}
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