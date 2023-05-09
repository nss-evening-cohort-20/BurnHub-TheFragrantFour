import { useEffect, useState } from "react"
import { FetchOrdersByUserFirebaseId } from "../APIManager"
import { CartItem } from "./CartItem"

export const Cart = () => {

    const localUser = localStorage.getItem("user")
    const currentUser = JSON.parse(localUser)

    const [orderItems, setOrderItems] = useState([])

    const getOpenOrder = async () => {
        const response = await FetchOrdersByUserFirebaseId(currentUser.uid, false)
        setOrderItems(response[0].orderItems)
    }

    const orderItemCountMessage = () => {
        if (orderItems.length === 1) {
            return "1 item"
        } else {
            return `${orderItems.length} items`
        }
    }

    useEffect(
        () => {
            getOpenOrder()
        },
        []
    )


    return (
        <div className="m-auto mt-4 w-2/3 ">
            <h3 className="mb-2 text-xl text-gray-200">Your Order ({orderItemCountMessage()})</h3>
            <div className="px-2 border border-gray-400 rounded-lg">
                {
                    orderItems.map((item) => {
                        return (
                            <CartItem
                                key={`cartItem--${item.id}`}
                                id={item.id}
                                name={item.item?.name}
                                image={item.item?.image}
                                price={item.item?.price}
                                quantity={item.itemQuantity}
                                getOpenOrder={getOpenOrder}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}