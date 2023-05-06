import { useNavigate } from "react-router-dom"

export const StoreCard = ({ storeId, profileImage, name }) => {

    const navigate = useNavigate()

    return (
        <section onClick={() => navigate(`/stores/${storeId}`)} key={`store--${storeId}`}>
            <div>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={profileImage} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
                
            </div>
        </section>
    )
}