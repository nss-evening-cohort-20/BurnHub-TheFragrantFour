import { useNavigate } from "react-router"
import { ProfileNavBar } from "./ProfileNavBar"

export const NavBar = () => {
    const navigate = useNavigate()
    
    return <main className="flex justify-between items-center w-full h-20 px-4 text-white fixed bg-black">
        <div>Hello werld</div>
        {
            localStorage.getItem("user")
            ? <ProfileNavBar />
            : <button onClick={() => navigate("/login")}>Sign In</button>
        }
    </main>
}