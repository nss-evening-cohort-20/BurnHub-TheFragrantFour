import { useEffect, useState } from "react"
import { FetchOrdersByUserFirebaseId, UpdateItem, UpdateOrder } from "../APIManager"
import { CartItem } from "./CartItem"
import { useNavigate } from "react-router"

export const Cart = () => {

    const localUser = localStorage.getItem("user")
    const currentUser = JSON.parse(localUser)

    const navigate = useNavigate()

    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])

    const getOpenOrder = async () => {
        const response = await FetchOrdersByUserFirebaseId(currentUser.uid, false)
        if (response.length > 0) {
            setOrder({
                id: response[0].id,
                userId: response[0].userId,
                dateCreated: response[0].dateCreated,
                dateComplete: response[0].dateComplete
            })
            setOrderItems(response[0].orderItems)
        }
    }

    const orderItemCountMessage = () => {
        let count = 0
        for (const orderItem of orderItems) {
            count += orderItem.itemQuantity
        }

        if (count === 1) {
            return "1 item"
        } else {
            return `${count} items`
        }
    }

    const getCartTotalPrice = () => {
        let total = 0
        for (const orderItem of orderItems) {
            total += (orderItem.itemQuantity * orderItem.item.price)
        }
        return total
    }

    useEffect(
        () => {
            getOpenOrder()
        },
        []
    )

    const handlePurchase = async () => {
        const currentOrder = order
        currentOrder.dateComplete = new Date()
        await UpdateOrder(order.id, currentOrder)
        for (const orderItem of orderItems) {
            const item = orderItem.item
            item.quantity -= orderItem.itemQuantity
            await UpdateItem(item.id, item)
        }
        window.alert("Purchase Completed.")
        navigate("/")
    }


    return <>
        {
            orderItems.length === 0
                ? <div className="m-auto mt-28 text-center text-gray-200 rounded-lg pt-12">
                    <h3 className="mb-8 text-xl font-light">There are no items in your cart.</h3>
                    <button
                        onClick={() => navigate("/Items")}
                        className="px-3 py-1 bg-amber-400 text-lg font-semibold text-gray-800 rounded"
                    >
                        Start Shopping!
                    </button>
                </div>
                : <div className="m-auto mt-4 w-3/5">
                    <h3 className="mb-2 text-xl text-gray-200">My Cart ({orderItemCountMessage()})</h3>
                    <div className="px-2 border border-gray-400 rounded-lg">
                        {
                            orderItems.map((item) => {
                                return (
                                    <CartItem
                                        key={`cartItem--${item.id}`}
                                        id={item.id}
                                        orderId={item.orderId}
                                        itemId={item.itemId}
                                        name={item.item?.name}
                                        image={item.item?.image}
                                        price={item.item?.price}
                                        quantity={item.itemQuantity}
                                        availableQuantity={item.item?.quantity}
                                        getOpenOrder={getOpenOrder}
                                        navigate={navigate}
                                    />
                                )
                            })
                        }
                    </div>
                    <span className="block w-full mx-auto mt-3 pr-8 text-right text-xl font-semibold text-gray-200">${getCartTotalPrice()}</span>
                    <button
                        className="block mx-auto mt-8 px-3 py-1 bg-amber-400 text-2xl font-semibold text-gray-800 rounded shadow-lg"
                        onClick={handlePurchase}
                    >
                        Purchase
                    </button>
                </div>
        }
    </>
}