import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { NotificationContext } from '../context/notification/notiContext'
import { useRef, useEffect, useContext } from 'react'

const EditableRow = ({
    id,
    editValue,
    setEditValue,
    updateTodo, 
    setEditID
}) => {
    const { notiAction } = useContext(NotificationContext)

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()     
      }, [])
    
    const handleSave = async () => {
        if(!editValue) return
        await updateTodo({ variables: { id : parseInt(id), description: editValue } })
        setEditID(null)
        notiAction('SAFE', `The todo is saved as '${editValue}'`)
    }
    return (
        <div className='todo'>
        <input value={editValue} onChange={e => setEditValue(e.target.value)} ref={inputRef}/>
        <button className='save-btn' onClick={handleSave}><FontAwesomeIcon icon={faSave}  /></button>
      </div>
    )
}

export default EditableRow