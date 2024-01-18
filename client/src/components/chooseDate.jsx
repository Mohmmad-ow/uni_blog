/* eslint-disable react/prop-types */

export default function ChooseDates({handleOneDate, handleTwoDate}) {
    
    
    

    return (
        <div className="bg-inherit">
            <button
                className="btn bg-transparent"
                onClick={() => document.getElementById("my_model_1").showModal()}
            >
                Choose dates
            </button>
            <dialog id="my_model_1" className="modal">
                <div className="modal-box">
                    <h3 className="text-center">Set Date</h3>
                        <details className="collapse mt-6 bg-base-200">
                            <summary className="collapse-title text-xl font-medium">Select one a Specific Date</summary>
                            <div className="collapse-content"> 
                                <div className="flex justify-center">
                                    <input className="rounded-lg bg-emerald-400 h-12 text-black" type="date" name="oneDate" id="oneDate"   />
                                </div>
                                <input onClick={handleOneDate} className="btn btn-accent mt-6 w-34 h-12" type="button" value="Select" />
                            </div>
                        </details>
                        <div className="divider divider-secondary">Or</div>
                        <details className="collapse bg-base-200">

                            <summary className="collapse-title text-xl font-medium">Select between two dates</summary>
                            <div className="collapse-content ">
                                <div className="flex justify-center">
                                    <input className="rounded-lg bg-emerald-400 h-12 text-black" type="date" name="dateOne" id="dateOne" />
                                    <div className="divider lg:divider-horizontal">TO</div> 
                                    <input  className="rounded-lg bg-emerald-400 h-12 text-black" type="date" name="dateTwo" id="dateTwo" />
                                </div>
                                
                                <input onClick={handleTwoDate} type="button" className="btn btn-accent mt-6 w-34 h-12" value="Select" />
                            </div>
                        </details>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
