import { useState } from "react";

// Components
import Navbar from "../components/navbar";
import Footer from "../components/footer";
let date = new Date().toLocaleDateString("en-US")
const content = [
    {title: "How to get bitches", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam error placeat ullam mollitia cupiditate repudiandae tempore. Deserunt perferendis, saepe perspiciatis hic labore doloremque, repellendus minus assumenda possimus repellat nemo sed dolores explicabo?",
        user: "Mohmmad", postedAt: date},
    {title: "How to get a life", text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam error placeat ullam mollitia cupiditate repudiandae tempore. Deserunt perferendis, saepe perspiciatis hic labore doloremque, repellendus minus assumenda possimus repellat nemo sed dolores explicabo?",
        user: "Zain", postedAt: date}
]

export default function Home() {


    return (
        <div className="bg-gray-800">
            <Navbar />
            <main className="flex md:flex-row flex-col pt-8 ">
                <div className="md:w-2/3 ">
                    <h1 className="text-center text-2xl pb-12 text-slate-50">Featured</h1>
                    <div className="carousel w-[60%] rounded-lg">
                        <div id='item1' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-red-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[0].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[0].title} by <strong>{content[0].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[0].text.length > 144 ? content[0].text.substring(0, 144) : content[0].text}</p>
                            </div>
                        </div>
                        <div id='item2' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-green-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[1].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[1].title} by <strong>{content[1].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[0].text}</p>
                            </div>
                        </div>
                        <div id='item3' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-purple-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[0].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[0].title} by <strong>{content[0].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[0].text.length > 144 ? content[0].text.substring(0, 144) : content[0].text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full py-2 gap-2">
                        <a href="#item1" className="btn btn-xs">1</a> 
                        <a href="#item2" className="btn btn-xs">2</a> 
                        <a href="#item3" className="btn btn-xs">3</a> 
                        
                    </div>
                    <div>
                        <h1 className="pb-12 px-3 md:text-xl text-md pt-8">like what you see! explore what the student body has to offer</h1>
                        <button className="btn md:btn-wide btn-lg  font-mono bg-gradient-to-tr from-red-500 to-hue-secondary-1 hover:from-red-700 hover:to-red-950 text-slate-50 md:text-3xl text-2xl mb-12  rounded-full ">View More</button>
                    </div>
                </div>
                <div className="md:w-1/3 ">
                    <h1 className="text-slate-50 pb-8 text-2xl md:mr-14 mr-0">Important announcements</h1>
                    <div className="flex md:flex-col md:px-0 px-4 gap-12 pb-8 md:mr-12 mr-0">
                        <div className="pt-8 md:w-[90%]  mx-auto  flex flex-col justify-end items-start bg-red-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[0].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[0].title} by <strong>{content[0].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[0].text.length > 144 ? content[0].text.substring(0, 144) : content[0].text}</p>
                        </div>
                        <div className="pt-8 md:w-[90%] mx-auto  flex flex-col justify-end items-start bg-green-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[0].text}</p>
                        </div>
                        <div className="pt-8 md:w-[90%] mx-auto  flex flex-col justify-end items-start bg-purple-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[0].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[0].title} by <strong>{content[0].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[0].text.length > 144 ? content[0].text.substring(0, 144) : content[0].text}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}