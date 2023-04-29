import userEvent from "@testing-library/user-event"
import { Authorized } from "../views/Authorized"

export const NavBar = () => {

    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-white fixed bg-black
        ">Hello werld</div>
        // !user
        //     ? <button>Sign In</button>
        //     : <Authorized>
        //         <SubNavBar />
        //     </Authorized>
    )
}