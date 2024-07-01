import { useState } from "react"

export const LoginPage = () => {
    const[registerForm, setRegisterForm] = useState(false)

    function handleClick() {
        setRegisterForm(!registerForm)
    }

    function handleSubmit() {
        // to implement
    }

    return (
        <>
            <div className="flex justify-center mt-8">
                {/* <button className="btn" onClick={handleLoginChoose}>Log In</button>
                <button className="btn ml-4" onClick={handleRegisterChoose}>Register</button> */}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden w-full">
                    <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                        <h1 className="text-3xl font-semibold text-center text-gray-700">
                            { registerForm ? "Register" : "Login" }
                        </h1>
                        <form className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Enter Password" className="w-full input input-bordered" />
                            </div>
                            <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600" onClick={handleClick}>{ registerForm ? "Create an accout ?" : "You have an account ?"}</a>
                            <div>
                                <button className="btn btn-block btn-neutral">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </form>
        </>
    )
}