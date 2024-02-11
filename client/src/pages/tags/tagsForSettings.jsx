import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function ViewTagsSettings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(-1);
    const [update, setUpdate] = useState(false);
    const [isDeleting, setIsDeleting] = useState(-1);


    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/tags/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setData(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
            setUpdate(false);
            setIsEditing(-1);
          }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

     const handleUpdateTag = async (tagId, tag) => {
         await axios.put("/tags/tag/update/"+tagId, {
             tag: tag.name
         }, {
             headers: {
                 "Authorization": `Bearer ${accessToken}`
             }
         })
         setUpdate(true);
         return;
     }

     function handleInputChange(e) {
        const newData = data.map((tag) => {
            if (e.target.id == tag.id) {
                tag.name = e.target.value;
                return tag
            } else {
                return tag;
            }
        })
        setData(newData);
     }

     const handleDeleteTag = async (tagId) => {
        await axios.delete("/tags/tag/delete/" + tagId, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        setUpdate(true);
        setIsDeleting(-1); // Reset the deleting state after deletion
      };
 

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }


      return (
        <div className="flex gap-4 mt-12 px-8 flex-col justify-center items-center">
            {data.map((tag) => {

            if (isDeleting === tag.id) {
                return (
                <div key={tag.id} className="flex justify-center items-center gap-4">
                    <p>Are you sure you want to delete this major?</p>
                    <button className="btn btn-warning" onClick={() => handleDeleteTag(tag.id)}>Yes</button>
                    <button className="btn btn-accent" onClick={() => setIsDeleting(-1)}>No</button>
                </div>
                );
            } else {
                return (
                    <div className={`flex justify-between ${isEditing === tag.id ? "gap-0" : "gap-12"} items-center bg-green-400 rounded-xl text-white py-2 px-4 w-full`} key={tag.id}>
                        {isEditing === tag.id ?
                            <input className="w-32" type="text" value={tag.name} onChange={handleInputChange} name={tag.name} id={tag.id} />  
                         :
                            <p className="">{tag.name}</p>}
                        <div className="flex justify-center gap-2 items-center">
                            {isEditing === tag.id ? 
                                <button onClick={() => {handleUpdateTag(tag.id, tag)}} className="btn btn-accent">Update</button>
                            :
                                <button onClick={() => {setIsEditing(tag.id)}} className="btn btn-accent">Edit</button> 
                            }
                            { isEditing !== tag.id ?
                                <button onClick={() => {setIsDeleting(tag.id)}} className="btn btn-warning">Delete</button>
                            :
                                <button onClick={() => {setIsEditing(-1)}} className="btn btn-warning">Cancel</button>
                            }
                        </div>
                    </div>
                )
            }


                
            })}
        </div>
      )

}