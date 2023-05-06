import { useEffect, useState } from "react"
import {FetchStores} from "../APIManager"
import { StoreCard } from "./StoreCard"


export const AllStores = () => {
    const [stores, setStores] = useState([])

    const fetchStores = async () => {
        const storesArray = await FetchStores()
        setStores(storesArray)
    }

    useEffect (() => {
        fetchStores ()
    }, [])

    return (

        <main>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Stores</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {stores.map((store) => {
                            return (
                                <StoreCard
                                    itemId={store.id}
                                    image={store.profileImage}
                                    name={store.name}
                                    
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </main>

    )
}