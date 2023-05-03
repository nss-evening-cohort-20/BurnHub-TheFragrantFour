import { useState } from "react"

export const Store = () => {
    const [stores, setStores] = useState([])

    useEffect(() => {
        const storesFetch = async () => {
          const response = await fetch(`https://localhost:7069/Stores`);
          const storesData = await response.json();
          setStores(storesData);
        };
        storesFetch();
      }, []);

    return <main>
        <div>
            {stores.map((store) => (
                
             ))}
        </div>
        

    </main>
}