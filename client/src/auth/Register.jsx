import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Register() {
    const [credentials, setCredentials] = useState(null)
    const message = "No Info provided";
    const nav= useNavigate()

    async function handleRegister() {
        try {
            const response = await axios.post("http://localhost:3000/users/auth/create", credentials);
            console.log(response.data);
            nav("/login")
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

                <h1 className="text-center text-white text-2xl">Get Started!</h1>
                <div className="w-full flex justify-center py-6">
                    <input placeholder="Username" className="w-[80%] input input-bordered input-secondary" onChange={handleInputChange} type="username" name="username" id="username" />
                </div>
                <div className="w-full flex justify-center py-6">
                    <input placeholder="Email" className="w-[80%] input input-bordered input-secondary" onChange={handleInputChange} type="email" name="email" id="email" />
                </div>
                <div className="w-full flex justify-center py-6">
                    <input placeholder="Password" className="w-[80%] input input-bordered input-secondary" onChange={handleInputChange} type="password" name="password" id="password" />
                </div>
                <button className="btn w-full btn-lg rounded-none mt-44" onClick={handleRegister} type="submit">Register</button>
            </div>
            <Footer />
        </div>
    )

}