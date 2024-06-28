import { useState } from "react"

export const LoginPage = () => {
    const [selectLogin, setSelectLogin] = useState<boolean>(false)
    const [selectRegister, setSelectRegister] = useState<boolean>(false)

    function handleLoginChoose() {
        setSelectRegister(false)
        setSelectLogin(true)
    }

    function handleRegisterChoose() {
        setSelectLogin(false)
        setSelectRegister(true)
    }

    function handleSubmit() {
        // to implement
    }

    return (
        <>
            <button onClick={handleLoginChoose}>Log In</button>
            <button onClick={handleRegisterChoose}>Register</button>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>email :</label>
                    <input type="text" name="username" required/>
                </div>
                <div>
                    <label>Password :</label>
                    <input type="password" name="password" required/>
                </div>
                <button type="submit">Log In</button>
            </form>
        </>
    )
}