import { useContext } from "react"
import { SelectContext } from "../context/SelectContext"
const Select = () => {
    const {setSelectedValue} = useContext(SelectContext)
    return (
        <div className='select'>
            <select name='todos' className='filter-todo' onChange={e => setSelectedValue(e.target.value)}>
                <option value='all'>All</option>
                <option value='true'>Finished</option>
                <option value='false'>Unfinished</option>
            </select>
        </div>
    )
}

export default Select