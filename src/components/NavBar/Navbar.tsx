import React from 'react';
import Logo from "../../assets/IcanFly_Inline.svg"
import { Link } from "react-router-dom"

export const Navbar: React.FC = () => {
    return (
        <>
            <div className="navbar sm:py-1 flex sm:justify-between justify-around items-center bg-fifth">
                <Link to="/">
                    <div className='text-5xl text-orange_two sm:ml-24 ml-2  text-first font-bold select-none'>ICanFly</div>
                </Link>
                <div className='flex sm:mr-36 mr:2'>
                    <Link to="/login">
                        <button className="btn btn-square hover:bg-third text-white bg-black sm:mr-4 mr-2 sm:w-24 w-20 p-2">Connexion</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-square hover:bg-third text-white bg-black btn-ghost sm:w-24 w-20 ">Login</button>*
                    </Link>
                </div>
            </div>
        </>
    );
};