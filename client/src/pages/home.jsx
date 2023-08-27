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
        <div className="bg-gray-700">
            <Navbar />
            {/* Hero section */}
            <main className="flex md:flex-row flex-col pt-8 ">
                {/* Featured */}
                <div className="md:w-2/3 flex flex-col  items-center">
                    <h1 className="text-center text-2xl flex just pb-12 text-slate-50">Featured</h1>
                    <div className="carousel w-[60%]  rounded-lg">
                        <div id='item1' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-red-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[1].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[1].title} by <strong>{content[1].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                            </div>
                        </div>
                        <div id='item2' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-green-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[1].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[1].title} by <strong>{content[1].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                            </div>
                        </div>
                        <div id='item3' className="mx-auto carousel-item w-full">
                            <div className="pt-16 flex flex-col justify-end items-start bg-purple-400 px-8 text-blue-400 ">
                                <p className="text-left text-sm pt-12"><small>{content[1].postedAt}</small></p>
                                <h3 className="text-left text-xl py-4">{content[1].title} by <strong>{content[1].user}</strong></h3>
                                <p className="text-left text-md py-4">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full py-4 gap-2">
                        <a href="#item1" className="btn btn-sm bg-white">1</a> 
                        <a href="#item2" className="btn btn-sm bg-white">2</a> 
                        <a href="#item3" className="btn btn-sm bg-white">3</a> 
                        
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="pb-12 px-3 text-center md:text-xl text-md pt-8">like what you see! explore what the student body has to offer</h1>
                        <button className="btn md:btn-wide btn-lg  font-mono bg-gradient-to-tr from-red-500 to-hue-secondary-1 hover:from-red-700 hover:to-red-950 text-slate-50 md:text-3xl text-2xl mb-12  rounded-full ">View More</button>
                    </div>
                </div>
                {/* Important announcements */}
                <div className="md:w-1/3 md:pr-12 flex flex-col items-center">
                    <h1 className="text-center text-slate-50 pb-8 text-2xl ">Important announcements</h1>
                    <div className="flex flex-col  md:px-0 px-4 gap-12 pb-8 ">
                        <div className="pt-8 md:w-[90%]  mx-auto  flex flex-col justify-end items-start bg-red-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                        </div>
                        <div className="pt-8 md:w-[90%] mx-auto  flex flex-col justify-end items-start bg-green-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                        </div>
                        <div className="pt-8 md:w-[90%] mx-auto  flex flex-col justify-end items-start bg-purple-400 px-4 text-blue-400 rounded-lg ">
                            <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                            <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                            <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Other Blogs */}
            <div id="second" className="pb-14">

                {/* Top of the year */}
                <h1 className="text-3xl text-center text-white py-12">Top 4 Blogs of your Year!</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 px-12 gap-4">
                    <div className=" pt-8  mx-auto text-black flex flex-col justify-end items-start bg-green-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-amber-400 px-4 rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-cyan-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-red-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                </div>

                <hr className="w-[80%]  bg-white mx-auto mt-12 rounded-full" />
                {/* Top of the major */}
                <h1 className="text-3xl text-center text-white py-12">Top 4 Blogs of your Major!</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 px-12 gap-4">
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-amber-400 px-4 rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-red-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black  flex flex-col justify-end items-start bg-cyan-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                    <div className=" pt-8  mx-auto text-black flex flex-col justify-end items-start bg-green-400 px-4  rounded-lg ">
                        <p className="text-left text-xs pt-4"><small>{content[1].postedAt}</small></p>
                        <h3 className="text-left text-lg py-2">{content[1].title} by <strong>{content[1].user}</strong></h3>
                        <p className="text-left text-sm py-2">{content[1].text.length > 144 ? content[1].text.substring(0, 144) : content[1].text}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}