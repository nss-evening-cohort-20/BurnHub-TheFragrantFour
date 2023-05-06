import { useNavigate } from "react-router"

export const HomeCard = ({ navRoute, text, img1, img1AltText, img2, img2AltText, img3, img3AltText }) => {
    const navigate = useNavigate()


    return <section onClick={() => navigate(navRoute)} className="h-36 w-full p-10 flex justify-between items-center text-gray-800 bg-gray-300 border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-gray-900 hover:underline hover:cursor-pointer">
    <div className="w-1/2 flex justify-center leading-normal">
        <h5 className="text-center mb-2 text-3xl font-medium tracking-tight dark:text-white">{text}</h5>
        <svg className="w-2 fill-gray-800 ml-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
        <svg className="w-2 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
        <svg className="w-2 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
    </div>
    <div className="w-1/2 flex justify-end gap-6">
        <img className="object-contain w-28 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img1} alt={img1AltText}/>
        <img className="object-contain w-28 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img2} alt={img2AltText}/>
        <img className="object-contain w-28 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img3} alt={img3AltText}/>
    </div>
</section>
}