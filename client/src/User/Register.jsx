import { useState } from "react";
import axios from "axios"

export default function Register() {
    const [credentials, setCredentials] = useState(null)
    const message = "No Info provided";

    async function handleRegister() {
        try {
            const response = await axios.post("http://localhost:3000/users/auth/create", credentials);
            console.log(response.data);
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
                <label htmlFor="username">Username</label>
                <input onChange={handleInputChange} type="username" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input onChange={handleInputChange} type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={handleInputChange} type="password" name="password" id="password" />
            </div>
            <button onClick={handleRegister} type="submit">Register</button>
        </div>
    )

}