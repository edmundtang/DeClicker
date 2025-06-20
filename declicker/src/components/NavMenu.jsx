import React from "react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
    const navigate = useNavigate();

    const returnHome = () => {
        navigate("/")
    }

    return(
        <div className="flex w-full h-[3rem] bg-[#14142c] border-bottom">
            <div className = "relative content-center pl-4 font-bold text-[#ffffff]" onClick={() => returnHome()}>
                DeClicker
            </div>
        </div>
    )
}

export default NavMenu;