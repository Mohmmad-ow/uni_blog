import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


// eslint-disable-next-line react/prop-types
export default function UpdateMajorComponent({MajId}) {

    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [major, setMajor] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/majors/major/"+MajId, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setMajor(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setMajor({...major,name: e.target.value  })
       console.log(major.name)
    }
    const handleUpdateMajor = () => {
        axios.put("/majors/major/update/"+MajId, {
            major: major.name
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
        <div className="flex justify-center">
            <div className="flex flex-col gap-6 py-2 justify-center">
                <div className="flex flex-row justify-center items-center">
                    <label htmlFor="major">Major</label>
                    <input value={major.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="major" onChange={handleNameUpdate} />
                </div>
                <button className="btn btn-accent" onClick={handleUpdateMajor} type="submit">Update</button>
            </div>
        </div>
    )


}