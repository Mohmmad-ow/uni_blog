/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";



import BlogDiv from "../../components/blogDiv";




export default function ViewBlogsComponent({data}) {
    
 
      return (
        <div className="grid grid-cols-3 gap-12 p-12">
            {data.map((blog) => {
            blog.blog = DOMPurify.sanitize(blog.blog);
            blog.blog = blog.blog.length > 255 ? blog.blog.slice(0, 255) + "..." : blog.blog


            return (
                <BlogDiv blog={blog} key={blog.id}/>
            )
            })}
        </div>
      );
    

}