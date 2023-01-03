import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getCountryName } from "../../actions";



export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getCountryName(name))
    }

    function handleKeypress(e) {
        if(e.keyCode === 13) {
            handleSubmit(e)
        }
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleKeypress(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>🔍</button>
        </div>
    )
}