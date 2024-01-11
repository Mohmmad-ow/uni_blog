import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

// eslint-disable-next-line react/prop-types
export default function UpdateYearComponent({id}) {

    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [year, setYear] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/years/year/"+id, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setYear(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setYear({...year,name: e.target.value  })
       console.log(year)
    }
    const handleUpdateYear = () => {
        axios.put("/years/year/update/"+id, {
            year: year.name
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
        <div className="py-8 px-6 flex items-center flex-col gap-12">
            <div className="flex flex-row gap-6 items-center justify-center">
                <label htmlFor="tag">Tag</label>
                <input value={year.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="tag" onChange={handleNameUpdate} />
            </div>
            <button className="btn btn-accent" onClick={handleUpdateYear} type="submit">Update</button>
        </div>
    )


}