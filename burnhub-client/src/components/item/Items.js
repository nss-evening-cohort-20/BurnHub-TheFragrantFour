import { Fragment, useState, useEffect } from "react"
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { FetchItems, FetchPagedItems, GetCategories, FetchItemsBySearch } from "../APIManager"
import { ItemCard } from "./ItemCard"
import { useParams } from "react-router"
import ReactPaginate from "react-paginate"

export const Items = () => {

    // const sortOptions = [
    //     { name: 'Name', value: 'Name', current: true },
    //     { name: 'Price: Low to High', value: 'PriceAscending', current: false },
    //     { name: 'Price: High to Low', value: 'PriceDescending', current: false }
    // ]

    const {searchCriterion} = useParams()
    const [items, setItems] = useState([])
    const [pageCount, setpageCount] = useState(0)
    const [filteredItems, setFilteredItems] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(0)
    const [sortOptions, setSortOptions] = useState([
        { name: 'Name', value: 'Name' },
        { name: 'Price: Low to High', value: 'PriceAscending' },
        { name: 'Price: High to Low', value: 'PriceDescending' }
    ])
    const [sortOption, setSortOption] = useState(sortOptions[0])
   
    let limit = 8;

    // useEffect(() => {
    //     setSortOptions()
    // }, [])

    

    const fetchItems = async () => {
        const itemsArray = await FetchItems()
        setItems(itemsArray)
    }

    const fetchCategories = async () => {
        const categories = await GetCategories()
        setCategories(categories)
    }

    const getItemsFromSearch = async () => {
        const itemsArray = await FetchItemsBySearch(searchCriterion)
        setItems(itemsArray)
    }

    const searchCountMessage = () => {
        if (items.length === 1) {
            return `1 result found for "${searchCriterion}".`
        } else {
            return `${items.length} results found for "${searchCriterion}".`
        }
    }

    const fetchPageOne = async () => {
        const pageOne = await FetchPagedItems(1, limit, sortOption.value)
        setFilteredItems(pageOne)
    }

    useEffect(() => {
        fetchPageOne()
        
    }, [sortOption])

    useEffect(() => {
        const getItems = async () => {
            const res = await fetch(
                `https://localhost:7069/Items/`
            )
            const data = await res.json()
            const total = data.length
            setpageCount(Math.ceil(total / limit))
            fetchPageOne(1, limit, sortOption.value)
        }
        getItems()

    }, [limit])

    useEffect(() => {
        if (category === 0) {
            fetchPageOne()
        }
    }, [category])

    const fetchPagedItems = async (currentPage) => {
        const res = await fetch(
            `https://localhost:7069/Items/paged?pageNumber=${currentPage}&pageSize=${limit}&sortOrder=${sortOption.value}`
        )
        const data = await res.json()
        return data
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1

        const items = await fetchPagedItems(currentPage)

        setFilteredItems(items)
    }

    useEffect(() => {
        if (searchCriterion) {
            getItemsFromSearch()
        }
    }, [searchCriterion])

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (category > 0) {
            const itemsInCategory = items.filter(
                (item) => item.category.id === category
            )
            setFilteredItems(itemsInCategory)
        } else {
            setFilteredItems(items)
        }
    }, [category, items])


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">Category</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {categories.map((category, categoryIdx) => (
                                                                <div key={category.id} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${category.id}-${categoryIdx}`}
                                                                        name={`${category.id}[]`}
                                                                        defaultValue={category.id}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${category.id}-${categoryIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {category.name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option, idx) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            value={option.value}
                                                            className={classNames(
                                                                sortOption.name === option.name ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                            
                                                            onClick={() => {
                                                                setSortOption(option)
                                                                // sortOptions[idx].current = true
                                                                console.log(sortOptions[idx].current)
                                                                
                                                                // setSortOption(option.value = true)
                                                            }}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            {/* <label>Sort by:</label>
                                            <select id="sort-order" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                                                <option value="PriceAscending">Price (low to high)</option>
                                                <option value="PriceDescending">Price (high to low)</option>
                                                <option value="Name">Name (a to z)</option>
                                            </select> */}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                {/* <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    <button type="button" onClick={() => { setCategory(0) }}>Reset Filters</button>
                                </ul> */}

                                {/* ITEM CATEGORY API */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Category</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" onClick={() => { setCategory(0) }}/>
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {categories.map((category, categoryIdx) => (
                                                        <div key={category.id} className="flex items-center">
                                                            <input
                                                                id={`filter-mobile-${category.id}-${categoryIdx}`}
                                                                name={`${category.id}[]`}
                                                                defaultValue={category.id}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                onClick={() => { setCategory(category.id) }}
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${category.id}-${categoryIdx}`}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </form>

                            <div className="lg:col-span-3">
                                <main>

                                    <div className="bg-white">
                                    {
                                        searchCriterion
                                            ? <div className="text-center pt-2">{searchCountMessage()}</div>
                                            : ""
                                    }
                                        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                            <h2 className="sr-only">Products</h2>
                                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-10">
                                                {filteredItems.map((item) => {
                                                    return (
                                                        <ItemCard
                                                            itemId={item.id}
                                                            image={item.image}
                                                            name={item.name}
                                                            price={item.price}
                                                            description={item.description}
                                                        />
                                                    )
                                                })}
                                            </div>
                                            <ReactPaginate
                                                previousLabel={"previous"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={3}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination justify-content-center"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>

                                </main>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    )
}