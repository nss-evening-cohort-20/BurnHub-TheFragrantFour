import React, { useEffect, useState } from 'react'
import {FetchItemsByStore } from "../APIManager"
import { useParams } from 'react-router'
import { ItemCard } from '../item/ItemCard'

export const StoreDetail = () => {
    const { storeId } = useParams()
    const [storeItems, setStoreItems] = useState([])

    const fetchStore = async () => {
        const storeItemArray = await FetchItemsByStore(storeId)
        storeItems(storeItemArray)
    }

    useEffect(()=> {
        fetchStore()
    }, [storeId])

  return (
    <main>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="bg-white">    
    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Stores</h1>
    
        
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">{store.name}</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                
                {store.map((storeItems) => {
                    return (
                        
                           <div>{store.store[0].name}</div> 
                        
                    )
                })}
            </div>
        </div>
    </div>
    </div>
</main>
  )
}
