import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";


export default function AdminManger() {
    const accessToken = Cookie.get("access_token");
    const [data, setData] = useState(null);


    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/utility/settings`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            setData(response.data);
        }

        getData();
    }, []);


    async function onIsManger (user, type, idx) {
        console.log(user, type, idx)
        if (type == "manger") { 
                    await axios.put(`/utility/settings/${user.id}`, {
                        isManger: !user.isManger
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const newData =data.map((item) => {
                        if (item.id === idx) {
                                item.isManger = !item.isManger
                            return item;
                        }
                        return item
                    });
                    console.log(newData);
                    setData(newData);
        } else {   
                await axios.put(`/utility/settings/${user.id}`, {
                    isAdmin: !user.isAdmin
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const newData = data.map((item) => {
                    if (item.id === idx) {
                        item.isAdmin = !item.isAdmin
                        return item
                    }
                    return item
                });
                setData(newData);
        }
        }

    if (!data) {
        return (<>Loading...</>)
    }
    

    return (
        <div className="flex mb-24 flex-col h-auto gap-4">
                {data.map((item) => {
                    return (
                        <div className="p-4 flex flex-col justify-center bg-gray-600 rounded-xl gap-4 border-4 border-green-300" key={item.id}>
                            <h4 className="flex gap-2 items-center"><i className="text-xl">Username: </i><strong>{item.username}</strong>
                            </h4>
                            <div className="flex ml-12 items-center gap-4">
                                <label className="text-lg" htmlFor="isAdmin">Admin: </label>
                                <input className="checkbox checkbox-accent" onChange={() => {onIsManger(item, "admin", item.id)}} checked={item.isAdmin ? true : false} type="checkbox" name="isAdmin" id="" />
                            </div>
                            <div className="flex ml-12 gap-4">
                                <label className="text-lg" htmlFor="isManger">Manger: </label>
                                <input className="checkbox checkbox-accent" onChange={() => {onIsManger(item, "manger", item.id)}} checked={item.isManger ? true : false} type="checkbox" name="isManger" id="" />
                            </div>
                        </div>
                    )
                })}
        </div>
    )

}


