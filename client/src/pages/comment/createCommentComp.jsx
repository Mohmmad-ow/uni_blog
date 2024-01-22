/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function CreateCommentComponent({blogId, onCreateComment}) {
    const [comment, setComment] = useState("");
    const [response, setResponse] = useState({});


    async function handleCreateComment() {
        const token = Cookies.get("access_token");
        const response = await axios.post(`/blogs/blog/${blogId}/comments/create`, { 
            content: comment,
            BlogId: blogId,
         }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.status)
        if (response.status === 200) {
            onCreateComment();
        }
        setResponse(response);
        setComment("");
    }

    return (
        <>
            <div className="flex flex-col justify-start items-start">
                <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleCreateComment}
                >
                    Post Comment
                </button>
                <p className="text-red-500 text-sm mt-2">{response.error}</p>
            </div>
        </>
    )
}