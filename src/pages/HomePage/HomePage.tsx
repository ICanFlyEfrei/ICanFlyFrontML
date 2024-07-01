import Logo from "../../assets/icanfly-high-resolution-logo-transparent.png"
import './HomePage.css'

export const HomePage = ():JSX.Element => {


    return (
        <>
            <img className="logo" src={Logo} alt="logo" />
            <div className="ButtonGroup">
                <button className="btn ">Connexion</button>
                <button className="btn">Inscription</button>
            </div>

        </>
    )

}