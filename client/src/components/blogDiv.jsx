import Download from "../utility/viewPicture"


export default function DivBlog(content) {
    const blog = content.blog
    console.log(blog)
    return (
        <div className="card bg-red-400 p-4 w-96  shadow-xl">
                  {blog.imgUrl ? <figure><Download cssClasses={'max-h-32 w-full'} imagePath={blog.imgUrl} /></figure> : null}
                  <div className="card-body">
                      <h2 className="card-title">{blog.name}</h2>
                      <div className="card-body" dangerouslySetInnerHTML={{__html: blog.blog}}></div>
                      <div className="card-actions justify-end">
                          <a href={`/blogs/${blog.id}`} className="btn btn-sm btn-info">View More</a>
                      </div>
                  </div>
        </div>
    )
}