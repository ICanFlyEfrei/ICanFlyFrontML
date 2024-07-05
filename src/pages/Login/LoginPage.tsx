import { useState } from "react";
import axios from "axios";

export const LoginPage = () => {
    const [registerForm, setRegisterForm] = useState(false);
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    function handleClick() {
        setRegisterForm(!registerForm);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setMail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "firstname":
                setFirstname(value);
                break;
            case "lastname":
                setLastname(value);
                break;
            case "phoneNumber":
                setPhoneNumber(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const userFirstname = firstname || "John";
        const userLastname = lastname || "Doe";
        const userPhoneNumber = phoneNumber || "+33 6 00 00 00 00";

        console.log("try to register with:", { mail, password, userFirstname, userLastname, userPhoneNumber });
        event.preventDefault();
        if (registerForm) {
            axios.post(`https://icanfly.cybonix.fr/api/user/client`,{
                email:mail,
                password,
                firstName: userFirstname,
                lastName: userLastname,
                phoneNumber: userPhoneNumber
            }).then(response => {
                console.log('Response:', response)
            }).catch(error => {
                console.error('Error', error);
            })
        } else {
            console.log("try to login with:", { mail, password });
            axios.post(`https://icanfly.cybonix.fr/api/auth/login`, {
                email:mail, password
            }).then(response => (
                console.log('Response', response.data)
            )).catch(error => {
                console.log("Error", error)
            })
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg p-6 bg-second border-t-4 border-gray-600 rounded-md shadow-md border-r-4">
                <h1 className="text-3xl text-fifth font-bold text-center text-gray-700">
                    Your account
                </h1>
                <form className="space-y-4 mt-4 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-fifth">Email</span>
                        </label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email Address"
                            className="w-full input input-bordered"
                            value={mail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-fifth">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered text-fourth"
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {registerForm ? (
                        <>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text text-fifth">Password</span>
                                </label>
                                <input
                                    name="firstname"
                                    type="text"
                                    placeholder="Your Firstname"
                                    className="w-full input input-bordered text-fourth"
                                    value={firstname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text text-fifth">Password</span>
                                </label>
                                <input
                                    name="lastname"
                                    type="text"
                                    placeholder="Your Lastname"
                                    className="w-full input input-bordered text-fourth"
                                    value={lastname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text text-fifth">Password</span>
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Your phone number"
                                    className="w-full input input-bordered text-fourth"
                                    value={phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>)
                    : null }
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-fourth" onClick={handleClick}>
                        {!registerForm ? "Create an account?" : "You have an account?"}
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
