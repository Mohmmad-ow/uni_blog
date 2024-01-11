import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewYearsComponent() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/years/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setData(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
        <div className="grid grid-cols-3 gap-6 px-6 py-12">
            {data.map((year) => (
                <div key={year.id} className="card bg-red-500 p-4 w-96 flex flex-col gap-8 shadow-xl">
                    <h1>{year.name}</h1>
                    <a href={`/year/${year.id}`} className="btn btn-sm btn-info">View More</a>
                </div>
            ))}
        </div>

    )
}