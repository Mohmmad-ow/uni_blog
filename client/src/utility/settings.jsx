/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../context/authContext";


import axios from "axios";
import Cookie from "js-cookie";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import CreateTagsComponent from "../pages/tags/createTagsSettings"
import ViewTagsSettings from "../pages/tags/tagsForSettings";
import ViewMajorsSettings from "../pages/major/MajorsSettings";
import CreateMajorSettings from "../pages/major/majorCreateSettings";
import ViewDegreesSettings from "../pages/degree/viewDegreesSettings";
import CreateDegreeSettings from "../pages/degree/createDegreeSettings";
import AdminManger from "../profile/userAdminManger";

export default function Settings() {
    const accessToken = Cookie.get("access_token");
    const [data, setData] = useState(null);
    const [updateTag, setUpdateTag] = useState(false);
    const [updateMajor, setUpdateMajor] = useState(false);
    const nav = useNavigate();

    const {loading, user, error} = useFetchUser()


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

    
        
        function handleUpdateTag() {
            setUpdateTag(!updateTag);
        }
        function handleUpdateMajor() {
            setUpdateMajor(!updateMajor);
        }
    
    if (loading || !data) {
        return <>lLoading...retrieving user</>
    }

    if (user&&!user.isAdmin) {
       
       
       return (
        <div>
            <h5>You can't access the admin panel, incase these is an error contact your fellow admins to get it fixed</h5>
            <p>Return Home <a className="btn btn-success" href="/">Yes</a></p>
        </div>
       )
       
    }

    if (error) {
        nav("/login")
        return;
    }

    return (
        <div>
            <Navbar />
            <div className="flex gap-4 p-4">
                <div className="flex-1 text-center max-h-96 overflow-auto bg-slate-900 py-4 rounded-xl">
                    <p className="mt-6 ">Tags</p>
                        <CreateTagsComponent handleReload={handleUpdateTag}  />
                        <ViewTagsSettings key={updateTag} />       
                </div>
                <div className="flex-1 text-center max-h-96 overflow-auto bg-slate-900 py-4 rounded-xl">
                    <p className="mt-6">Majors</p>
                    <CreateMajorSettings  handleReload={handleUpdateMajor}  />
                    <ViewMajorsSettings key={updateMajor} />
                </div>
                <div className="flex-1 text-center max-h-96 overflow-auto bg-slate-900 py-4 rounded-xl">
                    <p className="mt-6" >Degrees</p>
                    <CreateDegreeSettings handleReload={handleUpdateMajor} />
                    <ViewDegreesSettings key={updateMajor} />
                </div>
                
            </div>
            <div className="flex px-4 pb-12 h-auto">
                <div className="flex-1 rounded-xl px-4 py-2 bg-slate-800">
                    <AdminManger />
                </div>
                <div className="flex-1">
                </div>
                <div className="flex-1">
                </div>
            </div>
            <Footer />
        </div>
    )
}