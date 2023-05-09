import { useEffect, useState } from "react"
import {FetchStores, FetchStoresBySearch} from "../APIManager"
import { StoreCard } from "./StoreCard"
import { useParams } from "react-router"


export const AllStores = () => {

    const {searchCriterion} = useParams()
    const [stores, setStores] = useState([])

    const fetchStores = async () => {
        const storesArray = await FetchStores()
        setStores(storesArray)
    }

    const getStoresFromSearch = async () => {
        const storesArray = await FetchStoresBySearch(searchCriterion)
        setStores(storesArray)
    }

    const searchCountMessage = () => {
        if (stores.length === 1) {
            return `1 result found for "${searchCriterion}".`
        } else {
            return `${stores.length} results found for "${searchCriterion}".`
        }
    }

    useEffect (() => {
        if (searchCriterion) {
            getStoresFromSearch()
        } else {
            fetchStores()
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
                    <h2 className="sr-only">Stores</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        
                        {stores.map((store) => {
                            return (
                                <StoreCard
                                    key={`store--${store.id}`}
                                    itemId={store.id}
                                    profileImage={store.profileImage}
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