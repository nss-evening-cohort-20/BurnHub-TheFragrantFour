import { Dialog } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export const SearchBar = () => {

    const navigate = useNavigate()

    const [searchTerms, setSearchTerms] = useState("")
    const [searchDropdown, setSearchDropdown] = useState(false)

    const submitSearch = (route) => {
        if (searchTerms) {
            navigate(`/${route}/search/${searchTerms}`)
        }
    }

    useEffect(
        () => {
            if (searchTerms) {
                setSearchDropdown(true)
            } else {
                setSearchDropdown(false)
            }
        },
        [searchTerms]
    )

    document.body.addEventListener("click", () => {
        if (document.activeElement.id !== "search" || !searchTerms) {
            setSearchDropdown(false)
        } else {
            setSearchDropdown(true)
        }
    })


    return (
        <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-2xl">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        onChange={(evt) => setSearchTerms(evt.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                submitSearch("items")
                                setSearchDropdown(false)
                            }
                        }}
                    />
                </div>
                {
                    !searchDropdown
                        ? ""
                        : <div className='absolute z-50 w-full sm:max-w-2xl bg-white'>
                            <div className="pl-10 text-sm font-light italic text-gray-600 border-b border-gray-200">searching "{searchTerms}" in items</div>
                            <div
                                onClick={() => {
                                    submitSearch("stores")
                                    setSearchDropdown(false)
                                }}
                                className="pl-10 font-semibold text-lg text-gray-900 hover:bg-gray-300 hover:cursor-pointer"
                            >
                                <span>Search "{searchTerms}" in </span>
                                <span className="px-1.5 bg-gray-200 text-gray-800 rounded">Stores</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}