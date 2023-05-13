import { useNavigate } from "react-router"

export const Home = () => {

    const stats = [
        { name: 'Stores', value: '1200+' },
        { name: 'Customers', value: '30,000+' },
        { name: 'Orders fulfilled', value: '250,000+' },
        { name: 'Smiles', value: 'Unlimited' },
    ]

    const navigate = useNavigate()


    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-42 sm:py-56">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/burnhub-e391e.appspot.com/o/burnhub-home.jpg?alt=media&token=57bfb541-769c-4ae0-b2f8-bcec8f1e2716"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center blur-sm"
            />
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ffe553] to-[#ffa42d] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ffee53] to-[#ffb52d] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-2xl lg:mx-0 pb-5">
                <h2 className="text-4xl tracking-tight text-amber-400 sm:text-6xl">BurnHub</h2>
                <p className="mt-6 text-lg leading-8 font-bold">
                    We like candles.
                </p>
                </div>
                <a
                        href="#"
                        className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {navigate("/items")}}
                    >
                        Start Shopping
                    </a>

                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                    <div key={stat.name} className="flex flex-col-reverse bg-amber-400 rounded-lg p-2">
                        <dt className="text-base leading-7 text-black">{stat.name}</dt>
                        <dd className="text-2xl font-bold leading-9 tracking-tight text-black">{stat.value}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
        </div>
    )
}
