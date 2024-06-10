import Logo from "@/assets/IcanFly_Inline.svg"
import Off from "@/assets/Power-Off-Logo-Transparent.png"
import "./Header.css"

export const Header = ():JSX.Element => {

    return (
        <div className="header">
            <img className="logo" src={Logo} alt="Logo" />
            <button className="disconnect">
                <img className="offImg" src={Off} alt="off" />
            </button>

        </div >
    )
}