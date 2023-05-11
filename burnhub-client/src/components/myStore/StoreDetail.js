import React, { useEffect, useState } from 'react'
import {FetchItemsByStore, FetchUserByFirebaseId } from "../APIManager"
import { useNavigate, useParams } from 'react-router'


export const StoreDetail = () => {
    const { storeId } = useParams()
    const [storeItems, setStoreItems] = useState([])
    const [store, setStore] = useState({})
    const navigate = useNavigate()

    const fetchStoreItems = async () => {
        const storeItemArray = await FetchItemsByStore(storeId)
        setStoreItems(storeItemArray)
        setStore(storeItemArray[0].store)
    }

    // const fetchUserByUId = async () => {
    //     const currentUser = await FetchUserByFirebaseId(uid)
    // }


    useEffect(()=> {
        fetchStoreItems()
    }, [storeId])

  return (
    <main>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="bg-white">   
    <div> 
    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{store.name}</h1>
    
            <img
              src={store.coverImage}
              alt="store cover"
              className="h-full w-full object-cover object-center"
            />
            
            </div>
        
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            
           

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <button onClick={() => navigate(`/ProductForm`)}>Add New Product</button>
                {storeItems.map((item) => {
                    return (
                        <main>
                        
                           <div>
                           <img
              src={item.image}
              alt={item.description}
              className="h-full w-full object-cover object-center"
            />
                            {item.name}
                           {item.description}
                           ${item.price}
                           <button onClick={() => navigate(`/items/${item.id}`)}>Buy</button>
                           </div> 
                           </main>
                    )
                })}
            </div>
        </div>
    </div>
    </div>
</main>
  )
}
