import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileNavBar } from './ProfileNavBar'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { FetchUserByFirebaseId } from '../APIManager'
import { SearchBar } from './SearchBar'

export const NavBar = () => {
  const navigate = useNavigate()
  const localUser = localStorage.getItem("user")
  const currentUser = JSON.parse(localUser)


    const [user, setUser] = useState({
      name: "",
      isSeller: false,
      dateCreated: "",
      email: "",
      firebaseId: "",
      image: ""
    })

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    const getUser = async () => {
      if (currentUser) {
        const response = await FetchUserByFirebaseId(currentUser.uid)
        setUser(response)
      }
    }

    useEffect(
      () => {
        getUser()
      },
      []
    )

    const productsNav = [
      { name: 'All Products', to: '/Items', },
      { name: 'Candles', to: '/Items/candles', },
      { name: 'Incense', to: '/Items/incense', },
      { name: 'Accessories', to: '/Items/accessories' }
    ]
    const userNavigation = [
      { name: 'Profile', to: '/profile' },
      { name: 'Favorites', to: '/favorites' },
    ]
    
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }


    const blurBackground = () => {
      // if (isLoginOpen || isRegisterOpen) {
      //   document.getElementById('nav').classList.add("blur")
      //   document.getElementById('home').classList.add("blur")
      //   // will need to add more once we get id's for other components
      // } else {
      //   document.getElementById('nav').classList.remove("blur")
      //   document.getElementById('home').classList.remove("blur")
      // }
    }

    useEffect(
      () => {
        blurBackground()
      },
      [isLoginOpen, isRegisterOpen]
    )


    return (
        
        <Disclosure as="header" className="bg-gray-800">
        {({ open }) => (
          <>
            <div id="nav" className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="relative z-10 flex px-2 lg:px-0">
                  <div onClick={() => navigate("/")} className="flex flex-shrink-0 items-center hover:cursor-pointer">
                    <svg className="block h-8 w-auto fill-amber-400" alt="Your Company" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/>
                    </svg>
                    <span className=" ml-2 text-lg text-amber-400">BurnHub</span>
                  </div>
                </div>
                <SearchBar />
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Profile NavBar */}
                {
                  currentUser
                    ? <ProfileNavBar
                      user={user}
                      setUser={setUser}
                    />
                    : <span onClick={() => setIsLoginOpen(true)} className="lg:z-10 lg:flex lg:items-center text-gray-300 hover:text-amber-500 hover:cursor-pointer">Sign In</span>
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

              </div>
              {/* main Nav items */}
              <nav className="hidden lg:flex lg:justify-center lg:gap-32 lg:space-x-8 lg:py-2" aria-label="Global">
                {/* Products Nav Dropdown */}
                <Menu as="div" className="ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">
                      <span className="pr-2">Products</span>
                      <svg className="w-3 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                      </svg>
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
                    <Menu.Items className="absolute left-50 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {productsNav.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              className={classNames(
                                active ? 'bg-gray-800' : '',
                                'block px-4 py-2 text-sm text-gray-100'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Link
                  key="Stores"
                  to="/stores"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                  //item.current ? 'bg-gray-900 text-white'
                >
                  Stores
                </Link>
              </nav>
            </div>
  
            <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Mobile Products Dropdown */}
                <Menu as="div" className="text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer block rounded-md py-2 px-3 text-base font-medium">
                  <div>
                    <Menu.Button className="flex items-center">
                      <span className="pr-2">Products</span>
                      <svg className="w-3 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                      </svg>
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
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {productsNav.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              className={classNames(
                                active ? 'bg-gray-800' : '',
                                'block px-4 py-2 text-sm text-gray-100'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* Mobile Stores Nav Option */}
                <Disclosure.Button
                  key="Stores"
                  as="a"
                  onClick={() => {navigate("/stores")}}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer block rounded-md py-2 px-3 text-base font-medium"
                  // item.current ? 'bg-gray-900 text-white'
                >
                  Stores
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.name}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                  </div>
                  <Link
                    type="button"
                    className="ml-auto flex-shrink-0"
                    to="/cart"
                  >
                    <span className="sr-only">View cart</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    <svg className="h-6 w-6 fill-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                  </Link>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={() => navigate(item.to)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white hover:cursor-pointer"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    key={'Become a Seller!'}
                    //onClick toggle storeForm modal?
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-amber-500 hover:bg-gray-700 hover:text-white hover:cursor-pointer"
                  >
                    Become a Seller!
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}