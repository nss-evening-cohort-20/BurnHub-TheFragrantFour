import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { FetchItem, FetchOrdersByUserFirebaseId, FetchUserByFirebaseId } from "../APIManager"
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { AddOrder, AddOrderItem } from "../APIManager"

export const ItemDetail = () => {

  const { itemId } = useParams()
  const [item, setItem] = useState([])
  const [orderItem, setOrderItem] = useState({
    quantity: 1
  })
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [user, setUser] = useState({
    name: "",
    isSeller: false,
    dateCreated: "",
    email: "",
    firebaseId: "",
    image: ""
  })
  
  const navigate = useNavigate()
  const localUser = localStorage.getItem("user");
  const currentUser = JSON.parse(localUser);

  const fetchItem = async () => {
    const item = await FetchItem(itemId)
    setItem(item)
  }

  const getUser = async () => {
    if (currentUser) {
      const response = await FetchUserByFirebaseId(currentUser.uid)
      setUser(response)
    }
  }

  const getQuantityOptions = () => {
    let options = []
    for (let n = 1; n <= item.quantity; n++) {
        options.push(<option value={n} key={`orderItemQuantityOption--${item.id}--${n}`}>{n}</option>)
    }
    return options
}

  useEffect(() => {
    fetchItem()
  }, [itemId])

  useEffect(() => {
    getUser()
  },
  []
  )

  const addToCart = async (e) => {
    e.preventDefault();

    let userOpenOrders = await FetchOrdersByUserFirebaseId(currentUser.uid, false)

    if (userOpenOrders.length === 0) {
      const newOrder = {
        userId: user.id,
        dateCreated: new Date()
      }
      await AddOrder(newOrder)
    }

    userOpenOrders = await FetchOrdersByUserFirebaseId(currentUser.uid, false)

    const newOrderItem = {
      orderId: userOpenOrders[0].id,
      itemId: item.id,
      itemQuantity: orderItem.quantity
    }
    await AddOrderItem(newOrderItem)

    navigate('/cart')
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className=" hidden overflow-hidden rounded-lg lg:block">
            <img
              src={item.image}
              alt={item.description}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className=" hidden overflow-hidden rounded-lg lg:block">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{item.name}</h1>from <div onClick={() => navigate(`/stores/${item.store?.id}`)}>{item.store?.name}</div>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{item.description}</p>
              </div>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${item.price}</p>
              <form className="mt-10">
                <fieldset>
                <div>
                    <section>
                    <select
                        name="quantity"
                        value={orderItem.quantity}
                        className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        onChange={
                            async (evt) => {
                                const copy = {...orderItem}
                                copy.quantity = evt.target.value
                                setOrderItem(copy)
                            }
                        }
                    >
                        {getQuantityOptions()}
                    </select>
                    </section>
                </div>
                </fieldset>
                {
                currentUser
                    ?
                <button
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-8 py-3 text-base font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={addToCart}
                >
                  Add to cart
                </button> :
                <span>
                  Login/Register to shop!
                </span>
                }
                <Login
                  isOpen={isLoginOpen}
                  setIsOpen={setIsLoginOpen}
                  setIsRegisterOpen={setIsRegisterOpen}
                  setUserObj={setUser}
                />
                <Register
                  isOpen={isRegisterOpen}
                  setIsOpen={setIsRegisterOpen}
                  setUserObj={setUser}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}