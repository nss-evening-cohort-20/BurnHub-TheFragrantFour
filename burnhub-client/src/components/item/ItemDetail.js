import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { FetchItem } from "../APIManager"

export const ItemDetail = () => {

  const { itemId } = useParams()
  const [item, setItem] = useState([])
  const navigate = useNavigate()

  const fetchItem = async () => {
    const item = await FetchItem(itemId)
    setItem(item)
    setItem(item)
  }

  useEffect(() => {
    fetchItem()
  }, [itemId])

  console.log(item)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
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
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}