import { useEffect, useState } from "react";
// import Download from "../../utility/viewPicture";
import axios from "axios";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";


import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BlogDiv from "../../components/blogDiv";



const accessToken = Cookies.get("access_token") 

export default function ViewBlog() {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/blogs/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setData(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      return (
        <div>
        <Navbar/>
        <div className="grid grid-cols-3 gap-12 p-12">
         {data.map((blog) => {
          blog.blog = DOMPurify.sanitize(blog.blog);
          blog.blog = blog.blog.length > 255 ? blog.blog.slice(0, 255) + "..." : blog.blog


          return (
              <BlogDiv blog={blog} key={blog.id}/>
          )
         })}
        </div>
        <Footer/>
        </div>
      );
    

}