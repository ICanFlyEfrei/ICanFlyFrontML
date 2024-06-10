import Logo from "../assets/IcanFly_Inline.svg"
import './HomePage.css'

export const HomePage = ():JSX.Element => {
    return (
        <>
            <img className="logo" src={Logo} alt="logo" />
            <div className="ButtonGroup">
                <button>Connexion</button>
                <button>Inscription</button>
            </div>

        </>
    )

}