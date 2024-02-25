/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import redHeart from "../../assets/heart-solid-red.svg"
import grayHeart from "../../assets/heart-solid-gray.svg"

export default function CreateLikeComp({BlogId, handleAddLike}) {
    console.log("the Blog Id: " + BlogId)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = Cookies.get("access_token");
    const [like,setLike] = useState(false);

    
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/likes/like/${BlogId}`,{
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }); 
                setLike(response.data.liked ? true : false)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }


            
        }
        getData()
    }, [])


    const handleClickLike = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`/likes/like/${BlogId}/create`, null, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            });
            console.log(response.data.event);
            setLike(response.data.liked ? false : true)
            handleAddLike()
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false);

        }


        
    }

    if (error) {
        return (
           <div>
                <p>Error</p>
           </div>
        )
    }

    if (loading) {
        <div>
            <p>Loading...</p>
        </div>
    }

    return (
            <button onClick={handleClickLike} className="w-full h-full">
                <img src={like ? redHeart : grayHeart} alt="" />
              </button>  
    )
}