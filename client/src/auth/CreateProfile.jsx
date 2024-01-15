import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

// import { useFetchUser } from "../context/authContext"
import storageRef from "../../firebase/firebaseStorage.js";
import { uploadBytes, ref } from "firebase/storage";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function CreateProfile() {
    const [data, setData] =  useState(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    // const {user,userLoading, dispatch, UserError} = useFetchUser();
    const [selectData, setSelectData] = useState(null)
    const accessToken = Cookies.get("access_token")





    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/utility/profile', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setSelectData(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])

    

    async function handleCreateProfile() {
        if(img) {
            await withImg()
        } else {
            await withoutImg()
        }
    }

    async function withImg() {
        const imgRef = ref(storageRef, `profile_pics/${img.name.split(" ").join("_")}`);
        uploadBytes(imgRef, img).then(async (snapshot) => {
           const response = await axios.post('/profiles/create', {
              full_name: data.full_name,
              profile_pic: snapshot.metadata.fullPath,
              DegreeId: data.degreeId,
              MajorId: data.majorId, 
              YearId: data.yearId
            },{headers: {
              "Authorization": `Bearer ${accessToken}`
          }});
            Cookies.set("access_token", response.data.token, {sameSite: "none", secure: true, expires: 1000 * 60 * 60 * 24})
          });
    }
    async function withoutImg() {
        const response = await axios.post('/profiles/create', {
            full_name: data.full_name,
            profile_pic: snapshot.metadata.fullPath,
            DegreeId: data.degreeId,
            MajorId: data.majorId, 
            YearId: data.yearId
          },{headers: {
            "Authorization": `Bearer ${accessToken}`
        }});
        Cookies.set("access_token", response.data.token, {sameSite: "none", secure: true, expires: 1000 * 60 * 60 * 24})
    }
    return (
        <div>
        <Navbar />
        <div className="lg:w-[80%] md:w-[90%] w-full rounded-lg py-4 px-4 bg-gradient-to-tr from-yellow-400 to-orange-700 mx-auto my-24">
                <h1 className="text-center text-white text-2xl">Profile</h1>

                <div className="w-full flex justify-center py-12">
                    <input onChange={(e) => {setData({...data, full_name: e.target.value})}} className="w-[80%] input input-bordered input-secondary" placeholder="Enter your full name" type="text" name="full_name" id="full_name" />
                </div>
                <div className="flex flex-row">
                    <div className="w-[50%] border-r-2 pr-6 border-gray-900">
                       

                        <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="degree">Degree</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="degree" className="select select-primary w-full max-w-xs">
                                    <option disabled selected>What is the Degree?</option>
                                    {loading == false ? selectData.degrees.map((degree) => (
                                        <option onClick={() => setData({...data, degreeId: degree.id})} key={degree.id} value={degree.id}>{degree.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                        <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="major">Major</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="major" className="select select-primary w-full max-w-xs">
                                    <option disabled selected>What is the major?</option>
                                    {loading == false ? selectData.majors.map((major) => (
                                        <option onClick={() => {setData({...data, majorId: major.id})}} key={major.id} value={major.id}>{major.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                        <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="year">Year</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="year" className="select select-primary w-full max-w-xs">
                                    <option disabled selected>What is the Year?</option>
                                    {loading == false ? selectData.years.map((year) => (
                                        <option onClick={() => {setData({...data, yearId: year.id})}} key={year.id} value={year.id}>{year.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                    </div>
                    <div>
                        <div className='px-8 py-6 flex items-center gap-8'>
                            <label htmlFor="image" className="text-slate-200">Profile Pic</label>
                            <input type="file" id="image" onChange={(e) => {setImg(e.target.files[0])}} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                        </div>
                    </div>
                </div>
                

               

                <button onClick={handleCreateProfile} className="btn w-full btn-lg rounded-none mt-44" type="submit">Create Profile</button>
            </div>
        <Footer />
        </div>
    )



}