import { useState } from "react"
import { DeleteOrderItem, UpdateOrderItem } from "../APIManager"

export const CartItem = ({ id, orderId, itemId, name, image, price, quantity, availableQuantity, getOpenOrder, navigate }) => {

    const [orderItem, setOrderItem] = useState({
        id: id,
        orderId: orderId,
        itemId: itemId,
        itemQuantity: quantity
    })

    const getQuantityOptions = () => {
        let options = []
        for (let n = 1; n <= availableQuantity; n++) {
            options.push(<option value={n} key={`orderItemQuantityOption--${id}--${n}`}>{n}</option>)
        }
        return options
    }


    return (
        <div className="my-1 w-full flex justify-between p-4 text-gray-300 border-t border-b border-gray-600">
            <img
                className="h-28 w-28 rounded-sm hover:cursor-pointer"
                src={image}
                onClick={() => {navigate(`/items/${itemId}`)}}
            />
            <div className="ml-4 flex flex-col justify-between">
                <span
                    className="text-xl hover:cursor-pointer hover:underline"
                    onClick={() => {navigate(`/items/${itemId}`)}}
                >
                    {name}
                </span>
                <div className="mt-auto">
                    <span className="text-sm">Quantity: </span>
                    <select
                        name="quantity"
                        value={orderItem.itemQuantity}
                        className="text-xs text-gray-800 rounded-sm"
                        onChange={
                            async (evt) => {
                                const copy = {...orderItem}
                                copy.itemQuantity = evt.target.value
                                setOrderItem(copy)
                                await UpdateOrderItem(id, copy)
                                getOpenOrder()
                            }
                        }
                    >
                        {getQuantityOptions()}
                    </select>
                </div>
                <span className="text-sm">Individual price: ${price}</span>
            </div>
            <div className="ml-auto flex flex-col justify-between">
                <svg
                    className="w-3 ml-auto fill-red-500 hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    onClick={async () => {
                        await DeleteOrderItem(id)
                        getOpenOrder()
                    }}
                >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
                <span>Total: ${price * quantity}</span>
            </div>
        </div>
    )
}