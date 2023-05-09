export const CartItem = ({ id, name, image, price, quantity, getOpenOrder }) => {


    return (
        <div className="my-1 w-full flex justify-between p-4 text-gray-300 border-t border-b border-gray-600">
            <img className="h-auto w-20 border border-gray-200" src={image} />
            <div className="ml-4 flex flex-col">
                <span className="text-xl">{name}</span>
                <span className="text-sm">Quantity: {quantity}</span>
                <span className="text-sm">Individual price: ${price}</span>
            </div>
            <div className="ml-auto flex flex-col justify-between">
                <svg className="w-3 ml-auto fill-red-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
                <span>Total: ${price * quantity}</span>
            </div>
            {/* Exit Button */}
        </div>
    )
}