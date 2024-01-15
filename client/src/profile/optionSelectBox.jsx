export default function OptionSelectBox({options, selectedOption, handleSelectOption, name, loading}) {


    return (
        <div className="flex flex-row gap-6 py-6 items-center justify-center">

            <label className="text-slate-200" htmlFor={name}>{name}</label>
                 
                <select id={name} defaultValue={"default"} className="select select-primary w-full max-w-xs">
                    {selectedOption != null ? <option onClick={handleSelectOption} value={selectedOption.id}>{selectedOption.name}</option> : <option disabled value={"default"}>What is the Degree?</option>}
                    {loading == false ? options.map((option) => (
                        <option onClick={handleSelectOption} key={option.id} value={option.id}>{option.name}</option>
                    )) : <option className="loading loading-spinner loading-md" ></option> }
                </select>  
        </div>
    )
}