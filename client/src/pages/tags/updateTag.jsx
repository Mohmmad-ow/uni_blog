import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateTag() {

    const id = window.location.pathname.split("/")[2];
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tag, setTag] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/tags/tag/"+id, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setTag(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setTag({...tag,name: e.target.value  })
       console.log(tag)
    }
    const handleUpdateTag = () => {
        axios.put("/tags/tag/update/"+id, {
            tag: tag.name
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
        <div>
        <Navbar />
            <div>
                <div>
                    <label htmlFor="tag">Tag</label>
                    <input value={tag.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="tag" onChange={handleNameUpdate} />
                </div>
                <button className="btn btn-accent" onClick={handleUpdateTag} type="submit">Update</button>
            </div>
        <Footer />
        </div>
    )


}