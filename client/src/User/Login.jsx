import { useState } from "react";
import axios from "axios"
import Cookies from "js-cookie";
export default function Login() {
    const [credentials, setCredentials] = useState(null)
    const message = "No Info provided";

    async function handleLogin() {
        try {
            const response = await axios.post("/users/auth/login",credentials);
            console.log(response.data.token);

            Cookies.set("access_token", response.data.token, {sameSite: "none", secure: true})
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    

    function handleInputChange(e) {
        setCredentials(credentials => ({...credentials, [e.target.name]: e.target.value}))
    }

    return (
        <div>
            <div>
                <label htmlFor="email">Email</label>
                <input onChange={handleInputChange} type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={handleInputChange} type="password" name="password" id="password" />
            </div>
            <button onClick={handleLogin} type="submit">Login</button>
        </div>
    )

}