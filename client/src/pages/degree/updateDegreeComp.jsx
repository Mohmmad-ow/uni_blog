/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"


export default function UpdateDegreeComponent({DegId}) {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [degree, setDegree] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/degrees/degree/"+DegId, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setDegree(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setDegree({...degree,name: e.target.value  })
       console.log(degree)
    }
    const handleUpdateDegree = () => {
        axios.put("/degrees/degree/update/"+DegId, {
            degree: degree.name
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }


    if (loading) {
      return <div>Loading...</div>;
    
  } 
  if (error) { 
      return <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-12 items-center justify-center gap-24">
                <div className="w-[25%] flex flex-col items-center justify-center gap-8">
                    <label htmlFor="degree">Degree</label>
                    <input value={degree.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="degree" onChange={handleNameUpdate} />
                </div>
                <button className="btn btn-wide btn-accent" onClick={handleUpdateDegree} type="submit">Update</button>
            </div>
  )
}