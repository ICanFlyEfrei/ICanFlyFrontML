import { useState } from "react";

export const LoginPage = () => {
    const [registerForm, setRegisterForm] = useState(false);

    function handleClick() {
        setRegisterForm(!registerForm);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // to implement
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg p-6 bg-second border-t-4 border-gray-600 rounded-md shadow-md border-r-4">
                <h1 className="text-3xl text-fifth font-bold text-center text-gray-700">
                    Your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4 w-full">
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-fifth">Email</span>
                        </label>
                        <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-fifth">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered text-fourth" />
                    </div>
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-fourth" onClick={handleClick}>
                        {registerForm ? "Create an account?" : "You have an account?"}
                    </a>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="btn btn-block border-white bg-white text-second text-2xl font-bold mt-4">
                            {registerForm ? "Register" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};