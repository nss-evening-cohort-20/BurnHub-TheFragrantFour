import { useNavigate } from "react-router"

export const HomeCard = ({ navRoute, text, img1, img1AltText, img2, img2AltText, img3, img3AltText }) => {
    const navigate = useNavigate()


    return <section onClick={() => navigate(navRoute)} className="h-44 w-full p-10 flex justify-between items-center bg-gray-300 border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer">
    <div className="w-1/2 flex flex-col justify-between leading-normal">
        <h5 className="text-center mb-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">{text}</h5>
    </div>
    <div className="w-1/2 flex justify-end gap-6">
        <img className="object-contain w-36 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img1} alt={img1AltText}/>
        <img className="object-contain w-36 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img2} alt={img2AltText}/>
        <img className="object-contain w-36 rounded-t-lg md:rounded-lg border border-gray-200 shadow rounded-lg" src={img3} alt={img3AltText}/>
    </div>
</section>
}