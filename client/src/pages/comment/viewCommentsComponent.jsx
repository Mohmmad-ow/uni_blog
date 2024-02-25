/* eslint-disable react/prop-types */
import Download from "../../utility/viewPicture"

// eslint-disable-next-line react/prop-types
export default function ViewCommentsComponent({comments, className}) {

    return (
        <div className={className}>
            {comments.map((comment) => {
                return (
                    <div  key={comment.id} className="p-2 border border-y-2 flex flex-col justify-start items-start  rounded-lg">
                        <div className="flex flex-row justify-center items-center gap-4 py-2">
                            <a href={"/profile/"+comment.Profile.id} className="avatar ">
                                <div className="w-12 mask rounded-full">
                                    <Download imagePath={comment.Profile.profile_pic}></Download>    
                                </div>
                            </a>
                            <p className="text-slate-900 "><strong>{comment.Profile.full_name}</strong></p>

                        </div>
                        <p className="text-black bg-slate-200 p-4 rounded-xl w-full">{comment.content}</p>
                       
                    </div>
                )
            })
            }
            
        </div>
    )
}