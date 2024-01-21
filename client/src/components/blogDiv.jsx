import Download from "../utility/viewPicture"


export default function DivBlog(content) {
    const blog = content.blog
    console.log(blog)
    if (blog.imgUrl === null) {
        return (
            <div className="flex flex-col justify-between bg-red-400 p-4 rounded-xl  shadow-xl">
                        <h className="card-title float-left "><strong>Title:</strong> {blog.name}</h>
                        <div className=" float-left" ><strong>Description:</strong> {blog.description}</div>
                        <div className="card-actions float-left justify-start">
                            <a href={`/blogs/${blog.id}`} className="btn btn-sm btn-info">View More</a>
                        </div>                
            </div>
        )
    }
    return (

        <div className="card bg-red-400 p-4  shadow-xl">
            <figure><Download cssClasses={'max-h-32 w-full'} imagePath={blog.imgUrl} /></figure>
                  <div className="card-body ">
                      <h className="card-title py-2"><strong>Title:</strong> {blog.name}</h>
                      <div className="py-2" ><strong>Description:</strong> {blog.description}</div>
                      <div className="card-actions py-2 justify-start">
                          <a href={`/blogs/${blog.id}`} className="btn btn-sm btn-info">View More</a>
                      </div>
                  </div>
        </div>
    )
}