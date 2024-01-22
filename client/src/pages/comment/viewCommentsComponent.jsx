/* eslint-disable react/prop-types */
import Download from "../../utility/viewPicture"

// eslint-disable-next-line react/prop-types
export default function ViewCommentsComponent({comments, className}) {
    
    return (
        <div className={className}>
            {comments.map((comment) => {
                return (
                    <div  key={comment.id} className="p-2 border border-y-2 flex flex-col justify-start items-start  rounded-lg">
                        <div className="flex flex-row justify-center items-center gap-4 p-4">
                            <div className="avatar">
                                <div className="w-12 mask mask-squircle">
                                    <Download imagePath={comment.Profile.profile_pic}></Download>    
                                </div>
                            </div>
                            <p className="text-black"><strong>{comment.Profile.full_name}</strong></p>

                        </div>
                        <p className="text-black bg-slate-200 p-4 rounded-xl w-full">{comment.content}</p>
                       
                    </div>
                )
            })
            }
        </div>
    )
}