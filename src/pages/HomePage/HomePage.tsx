import { Link } from "react-router-dom"
import Logo from "../../assets/icanfly-high-resolution-logo-transparent.png"
import './HomePage.css'

export const HomePage = (): JSX.Element => {


    return (
        <>{/* 
            <div className="text-8xl text-first h-1/4  mt-52 w-3/4 mx-5">
                Hey wanna catch a flight?
            </div>
            <div className="text-8xl text-first h-1/4  my-52 ml-0 mx-5 flex flex-row gap-4">
                <button
                    className="btn btn-square text-3xl align-middle bg-white text-first flex flex-1 w-full max-w-96 min-h-24">
                    Register a flight
                </button>
                <button
                    className="btn btn-square text-3xl align-middle bg-white text-first flex flex-1 w-full max-w-96 min-h-24">
                    Cath a flight
                </button>
            </div> */}
            <div className="grid row grid-cols-2 grid-rows-1 sm:mt-52 mt-20 sm:gap-y-48 gap-y-12 sm:ml-7">
                <div className="text-8xl text-first row-span-1 col-span-2">
                    Hey wanna catch a flight?
                </div>
                <Link to="/search">
                    <button
                        className="btn btn-square sm:text-3xl text-l align-middle bg-white text-first flex flex-1 w-full sm:max-w-96 max-w-36 min-h-24 row-span-1 col-span-1 ml-7">
                        Register a flight
                    </button>
                </Link>
                <Link to="/find">
                    <button
                        className="btn btn-square sm:text-3xl text-lalign-middle bg-white text-first flex flex-1 w-full sm:max-w-96 max-w-36 min-h-24 row-span-1 col-span-1">
                        Catch a flight
                    </button>
                </Link>
            </div>


        </>
    )

}