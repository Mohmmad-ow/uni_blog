import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// eslint-disable-next-line react/prop-types
export default function ChooseTags({handleSelectTag}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/tags/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setData(result);
            // setTags([...result.map((tag) => {
            //     return {id: tag.id, checked: false}
            // })])
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])

    function handleChooseTag(e) {
        console.log(tags)
        if(e.target.checked) {
            setTags((prevTags) => [...prevTags, e.target.value])
        } else {
            setTags((prevTags) => [...prevTags.filter((t) => t != e.target.value)])
        }
    }
    
    if (error) {
        return <>Error</>
    }
    if (loading) {
        return <>Loading...</>
    }
    return (
        <div className="bg-inherit">
            <button
                className="btn bg-transparent"
                onClick={() => document.getElementById("my_modal_2").showModal()}
            >
                Choose Tags
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex justify-center flex-col bg-slate-900">
                    <h3>Choose Tags</h3>
                    <div className=" grid grid-cols-3 gap-y-2 gap-x-4 justify-start items-start p-4">
                        {data.map((tag) => {
                            return (<div className="flex justify-start gap-2 items-center " key={tag.id}>
                                 <input  onClick={handleChooseTag} id={tag.id} type="checkbox" value={tag.id} className="checkbox checkbox-info" /> 
                                 <label htmlFor={tag.id}>{tag.name}</label>
                            </div>)
                        })}
                    </div>
                    <hr />
                    <button onClick={() => {handleSelectTag(tags)}} className="btn btn-accent mt-4">Choose Tags</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
