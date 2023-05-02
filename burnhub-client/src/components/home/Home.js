import candle1 from "../../images/candle-1.jpg"

export const Home = () => {

    return <a href="#" className="h-40 flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">View all products</h5>
        </div>
        <img className="object-cover w-full rounded-t-lg md:h-full md:w-6/12 md:rounded-none md:rounded-l-lg" src={candle1} alt=""/>
    </a>
    
}
