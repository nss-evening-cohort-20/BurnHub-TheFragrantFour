import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../helpers/googleAuth";
import { emailAuth } from "../helpers/emailAuth";
import { Dialog } from "@headlessui/react";

export const Register = ({ isOpen, setIsOpen, setUserObj }) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        password: "",
    })
    let navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()
        emailAuth.register(user, setUserObj, setIsOpen)
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    const onSubmitLogin = async () => {
        googleAuth.signInRegister(setUserObj, setIsOpen)
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-1/4 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed inset-0 flex flex-col justify-between items-center bg-gray-800 text-gray-300 rounded-lg shadow-2xl shadow-gray-900">
                <header className="mt-8 mb-8 text-3xl">
                    Register
                </header>
                <form className="w-full flex flex-col items-center gap-8" onSubmit={handleRegister}>
                    <fieldset className="w-2/3 flex">
                        <svg className="w-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        <input
                            type="text"
                            id="fullName"
                            onChange={updateUser}
                            className="w-full ml-2 pl-1 text-left text-xl border-b border-gray-400 bg-transparent focus:outline-none placeholder:font-light placeholder:text-gray-500"
                            placeholder="Full Name"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="w-2/3 flex">
                        <svg className="w-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                        <input
                            type="email"
                            id="email"
                            onChange={updateUser}
                            className="w-full ml-2 pl-1 text-left text-xl border-b border-gray-400 bg-transparent focus:outline-none placeholder:font-light placeholder:text-gray-500"
                            placeholder="Email"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="w-2/3 flex">
                        <svg className="w-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                        </svg>
                        <input
                            type="password"
                            id="password"
                            onChange={updateUser}
                            className="w-full ml-2 pl-1 text-left text-xl border-b border-gray-400 bg-transparent focus:outline-none placeholder:font-light placeholder:text-gray-500"
                            placeholder="Password"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="mt-4 flex flex-col justify-center items-center">
                        <button type="submit" className="text-xl px-2 py-1/2 text-amber-500 rounded hover:text-amber-400">Register</button>
                    </fieldset>
                </form>

                <section className="flex flex-col items-center">
                    <span className="block mb-4 font-thin">or</span>

                    <button type="submit" className="mb-12 px-3 py-1 border border-gray-400 rounded hover:text-gray-200" onClick={onSubmitLogin}>
                        <svg className="w-5 inline mr-2 fill-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                        <span>Register with Google</span>
                    </button>

                    {/* Exit Button */}
                    <svg className="w-3 absolute top-4 right-4 fill-amber-500 hover:fill-amber-400 hover:cursor-pointer" onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </section>
            </div>
        </Dialog>



        // <main style={{ textAlign: "center" }}>
        // <form className="form--login" onSubmit={handleRegister}>
        //     <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
        //     <fieldset>
        //     <label htmlFor="fullName"> Full Name </label>
        //     <input
        //         onChange={updateUser}
        //         type="text"
        //         id="fullName"
        //         className="form-control"
        //         placeholder="Enter your name"
        //         required
        //         autoFocus
        //     />
        //     </fieldset>
        //     <fieldset>
        //     <label htmlFor="email"> Email address </label>
        //     <input
        //         onChange={updateUser}
        //         type="email"
        //         id="email"
        //         className="form-control"
        //         placeholder="Email address"
        //         required
        //     />
        //     </fieldset>
        //     <fieldset>
        //     <label htmlFor="password"> Password </label>
        //     <input
        //         onChange={updateUser}
        //         type="text"
        //         id="password"
        //         className="form-control"
        //         placeholder="Must Be 6 Characters"
        //         required
        //         autoFocus
        //     />
        //     </fieldset>
        //     <fieldset>
        //     <button type="submit"> Register </button>
        //     </fieldset>
        // </form>
        // <h2>Register With Google?</h2>
        // <button type="submit" onClick={onSubmitLogin}>
        //     Let's Do It!
        // </button>
        // </main>
    )
}