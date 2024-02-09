import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CreateTagsComponent from "../pages/tags/createTagsSettings"
import ViewTagsSettings from "../pages/tags/tagsForSettings";
import ViewMajorsSettings from "../pages/major/MajorsSettings";
import CreateMajorSettings from "../pages/major/majorCreateSettings";

export default function Settings() {
    const accessToken = Cookie.get("access_token");
    const [data, setData] = useState(null);
    const [updateTag, setUpdateTag] = useState(false);
    const [updateMajor, setUpdateMajor] = useState(false);


    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/utility/settings`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            setData(response.data);
        }

        getData()
    }, [])

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
        function handleUpdateTag() {
            setUpdateTag(!updateTag);
        }
        function handleUpdateMajor() {
            setUpdateMajor(!updateMajor);
        }
    

    if (!data) {
        return (<>Loading...</>)
    }

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-3 gap-4 p-4">
                <div className="flex flex-col gap-4">
                {data.map((item) => {
                    return (
                        <div className="p-4 flex flex-col bg-yellow-800 gap-4" key={item.id}>
                            <p>{item.username}</p>
                            <div className="flex ml-12 gap-4">
                                <label htmlFor="isAdmin">Admin</label>
                                <input onChange={() => {onIsManger(item, "admin", item.id)}} checked={item.isAdmin ? true : false} type="checkbox" name="isAdmin" id="" />
                            </div>
                            <div className="flex ml-12 gap-4">
                                <label htmlFor="isManger">Manger</label>
                                <input onChange={() => {onIsManger(item, "manger", item.id)}} checked={item.isManger ? true : false} type="checkbox" name="isManger" id="" />
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="text-center max-h-[70%] overflow-auto bg-slate-900 py-4 rounded-xl">
                    <p className="mt-6 ">Tags</p>
                        <CreateTagsComponent handleReload={handleUpdateTag}  />
                        <ViewTagsSettings key={updateTag} />
                        
                </div>
                <div className="text-center max-h-[70%] overflow-auto bg-slate-900 py-4 rounded-xl">
                    <p className="mt-6">Majors</p>
                    <CreateMajorSettings  handleReload={handleUpdateMajor}  />
                    <ViewMajorsSettings key={updateMajor} />
                </div>
            </div>
            <Footer />
        </div>
    )
}