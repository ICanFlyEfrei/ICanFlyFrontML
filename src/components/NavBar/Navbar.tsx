import React from 'react';
import Logo from "../../assets/IcanFly_Inline.svg"

export const Navbar: React.FC = () => {
    return (
        <>
            <div className="navbar sm:py-1 flex sm:justify-between justify-around items-center bg-fifth">
                <div className='text-5xl text-orange_two sm:ml-24 ml-2  text-first font-bold'>ICanFly</div>
                <div className='flex sm:mr-36 mr:2'>
                    <button className="btn btn-square hover:bg-third text-white bg-black sm:mr-4 mr-2 sm:w-24 w-20 p-2">Connexion</button>
                    <button className="btn btn-square hover:bg-third text-white bg-black btn-ghost sm:w-24 w-20 ">Login</button>
                </div>
            </div>
        </>
    );
};