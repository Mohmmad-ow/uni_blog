import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Download from "../../context/viewPicture";
import Navbar  from "../../components/navbar";
import Footer from "../../components/footer";


export default function ViewBlog() {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const id = window.location.pathname.split('/')[2];


    const accessToken = Cookies.get("access_token");
    console.log(id);

    useEffect(() => {
        console.log("Gere")
        const fetchData = async () => {
            try {
                const response = await axios.get(`/blogs/blog/${id}`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const data = await response.data;
                console.log("here", data)
                setBlog(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        
        }
        fetchData();
    },[])

    if (loading) {
        return <div>Loading...</div>;
      
    } 
    if (error) { 
        return <div>Error</div>;
    }

    return (
        <div className="bg-gray-700">
            <Navbar/>
            <div  className="py-12 px-16">
                        <div className="">
                            <h1 className="text-center text-3xl">{blog.name}</h1>
                            <p>{blog.blog}</p>
                            <div className="card-actions justify-end">
                                <a href={`/blogs/blog/${blog.id}`} className="btn btn-primary">View</a>
                            </div>
                            <figure><Download imagePath={blog.imgUrl} /></figure>
                        </div>
                    </div>
            <Footer/>
        </div>
    )



}