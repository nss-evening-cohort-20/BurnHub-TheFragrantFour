import { logout } from "../helpers/logout"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Link, useNavigate } from 'react-router-dom'

export const ProfileNavBar = ({ user, setUser, isStoreFormOpen, setIsStoreFormOpen }) => {
    const navigate = useNavigate()

    const userNavigation = [
        { name: 'Profile', to: '/profile' },
        { name: 'Favorites', to: '/favorites' },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    
    return <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-4 flex-shrink-0">
            <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-white hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    {
                        user.image
                            ? <img className="h-8 w-8 rounded-full" src={user.image} alt="" />
                            : <span className="h-8 w-8 bg-amber-500 text-center text-xl font-semibold text-gray-800 rounded-full">{user.name[0]}</span>
                    }
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                        {({ active }) => (
                            <Link
                                to={item.to}
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                {item.name}
                            </Link>
                        )}
                        </Menu.Item>
                    ))}
                    {
                        user.isSeller
                            ? <Menu.Item key="Become a Seller!">
                                {({ active }) => (
                                    <span
                                        onClick={() => navigate("/myStore")}
                                        className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-amber-600 hover:cursor-pointer'
                                        )}
                                    >
                                        My Store
                                    </span>
                                )}
                            </Menu.Item>
                            : <Menu.Item key="Become a Seller!">
                                {({ active }) => (
                                    <span
                                        onClick={() => {setIsStoreFormOpen(true)}}
                                        className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-amber-600 hover:cursor-pointer'
                                        )}
                                    >
                                        Become a Seller!
                                    </span>
                                )}
                            </Menu.Item>
                    }
                    <Menu.Item key="Sign Out">
                        {({ active }) => (
                            <span
                                onClick={() => logout.logout(setUser, navigate)}
                                className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer'
                                )}
                            >
                                Sign Out
                            </span>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
        
        {/* Cart */}
        <Link
            type="button"
            className="flex-shrink-0 ml-2 p-2 rounded-full hover:bg-gray-600 hover:[&>*]:fill-white"
            to="/cart"
        >
            <span className="sr-only">View cart</span>
            <svg className="h-6 w-6 fill-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
        </Link>
    </div>
}