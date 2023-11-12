import { useState } from "react";
import axios from "axios"
import Cookies from "js-cookie";


// Components
import Footer from "../components/footer";
import Navbar from "../components/navbar";


export default function Login() {
    const [credentials, setCredentials] = useState(null)
    const message = "No Info provided";

    async function handleLogin() {
        try {
            const response = await axios.post("/users/auth/login",credentials);
            console.log(response.data.token);

            Cookies.set("access_token", response.data.token, {sameSite: "none", secure: true, expires: 1000 * 60 * 60 * 24})
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    function handleInputChange(e) {
        setCredentials(credentials => ({...credentials, [e.target.name]: e.target.value}))
    }
    return (
        <div>
            <Navbar />
            <div className="lg:w-[30%] md:w-[40%] w-[70%] rounded-lg py-4 px-4 bg-gradient-to-tr from-yellow-400 to-orange-700 mx-auto my-24">
                <h1 className="text-center text-white text-2xl">Continue</h1>

                <div className="w-full flex justify-center py-12">
                    <input onChange={handleInputChange} className="w-[80%] input input-bordered input-secondary" placeholder="Email" type="email" name="email" id="email" />
                </div>

                <div className="w-full flex justify-center py-12">    
                    <input onChange={handleInputChange} className="w-[80%] input input-bordered input-secondary" placeholder="Password" type="password" name="password" id="password" />
                </div>

                <button className="btn w-full btn-lg rounded-none mt-44" onClick={handleLogin} type="submit">Login</button>
            </div>
            <Footer />
        </div>
    )

}