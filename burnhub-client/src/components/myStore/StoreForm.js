import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { AddStore, FetchUserByFirebaseId, UpdateUser } from "../APIManager"

export const StoreForm = ({ isOpen, setIsOpen, localU, getUser }) => {

    const [newStore, setNewStore] = useState({
        userId: 0,
        dateCreated: "",
        name: "",
        profileImage: "",
        coverImage: ""
    })

    const createStore = async () => {
        //get user
        //set userid and datecreated to newstore
        //addstore
        const dbUser = await FetchUserByFirebaseId(localU.uid)
        const storeToAdd = newStore

        storeToAdd.userId = dbUser.id
        storeToAdd.dateCreated = new Date()
        await AddStore(storeToAdd)

        const updatedUser = {
            id: dbUser.id,
            name: dbUser.name,
            isSeller: true,
            dateCreated: dbUser.dateCreated,
            email: dbUser.email,
            firebaseId: dbUser.firebaseId,
            image: dbUser.image
        }
        await UpdateUser(dbUser.id, updatedUser)

        localU.isSeller = true
        localStorage.setItem("user", JSON.stringify(localU))

        await getUser()
        window.alert("Congrats, you're now a seller!")
        setIsOpen(false)
    }


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-1/4 h-1/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 fixed inset-0 flex flex-col justify-center items-center gap-12 bg-gray-800 text-gray-300 border-2 border-amber-500 rounded-lg shadow-2xl shadow-gray-900">

                <input
                    type="text"
                    value={newStore.name}
                    id="input-new-store"
                    onChange={(evt) => {
                        const copy = {...newStore}
                        copy.name = evt.target.value
                        setNewStore(copy)
                    }}
                    className="w-2/3 ml-2 pl-1 text-center text-xl border-b border-gray-400 bg-transparent focus:outline-none placeholder:font-light autofill:text-green-200 placeholder:text-gray-500"
                    placeholder="Store Name"
                    required
                    autoFocus
                />
                
                <div className="w-auto flex justify-center gap-2 rounded hover:cursor-pointer" onClick={createStore}>
                    <svg className="w-5 fill-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M240.8 4.8C250.3 10.6 256 20.9 256 32v72h89c3.6-13.8 16.1-24 31-24h88c26.5 0 48 21.5 48 48s-21.5 48-48 48H376c-14.9 0-27.4-10.2-31-24H256v72c0 11.1-5.7 21.4-15.2 27.2s-21.2 6.4-31.1 1.4l-192-96C6.8 151.2 0 140.1 0 128s6.8-23.2 17.7-28.6l192-96c9.9-5 21.7-4.4 31.1 1.4zM288 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H320c-17.7 0-32-14.3-32-32V256zM32 384h96c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32zm192 0H480c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32z"/>
                    </svg>
                    <button className="text-xl text-amber-500 rounded">Create Store!</button>
                </div>

            </div>
        </Dialog>
    )
}