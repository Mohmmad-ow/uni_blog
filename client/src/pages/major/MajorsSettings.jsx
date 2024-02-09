/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewMajorsSettings() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(-1);
    const [update, setUpdate] = useState(false);


    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/majors/all', {headers: {
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
    }, [update]);

    const handleUpdateMajor = async (majorId, major) => {
      await axios.put("/tags/tag/update/"+majorId, {
          tag: major.name
      }, {
          headers: {
              "Authorization": `Bearer ${accessToken}`
          }
      })
      setUpdate(true);
      return;
  }

  function handleInputChange(e) {
    const newData = data.map((major) => {
        if (e.target.id == major.id) {
            major.name = e.target.value;
            return major
        } else {
            return major;
        }
    })
    setData(newData);
 }

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
              <div className="flex gap-4 mt-12 px-4 flex-col justify-center items-center">

                {data.map((major) => {
                return (
                    <div className={`flex justify-between items-center ${isEditing === major.id ? "gap-0" : "gap-12"} bg-green-400 rounded-xl text-white py-2 px-4 w-full`} key={major.id}>
                        {isEditing === major.id ?
                          <input className="w-32" type="text" value={major.name} onChange={handleInputChange} name={major.name} id={major.id} />  
                         :
                          <p>{major.name}</p>}
                        <div className="flex justify-center gap-2 items-center">
                            {isEditing === major.id ? 
                                <button onClick={()=> {handleUpdateMajor(major.id, major)}} className="btn btn-accent">Update</button>
                            :
                                <button onClick={() => {setIsEditing(major.id)}} className="btn btn-accent">Edit</button> 
                            }
                            { isEditing !== major.id ?
                                <button className="btn btn-warning">Delete</button>
                            :
                                <button onClick={() => {setIsEditing(-1)}} className="btn btn-warning">Cancel</button>
                            }
                            
                        </div>
                    </div>
                )
            })}
            
              </div>
    )
}

