/* eslint-disable react/prop-types */

export default function ViewTagsComponent({data}) {

   
    return (
            <div className="grid grid-cols-3 gap-6 px-6 py-12">
                {data.map((tag) => (
                    <div key={tag.id} className="card bg-red-500 p-4 w-96 flex flex-col gap-8 shadow-xl">
                        <h1>{tag.name}</h1>
                        <a href={`/tag/${tag.id}`} className="btn btn-sm btn-info">View More</a>
                    </div>
                ))}
            </div>
    )
}