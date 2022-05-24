import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client';
import { DELETE_TODO, GET_TODOS } from '../gql';
import { useContext } from 'react'
import { NotificationContext } from '../context/notification/notiContext';

const ReadOnlyRow = ({ isFinished, description, updateTodo, id, setEditID, setEditValue}) => {
    const [deleteTodo] = useMutation(DELETE_TODO,  {refetchQueries: [
        GET_TODOS,
        'GetTodos'
      ], });

    const {notiAction} = useContext(NotificationContext)
    const updateHandle = () => {
        if(isFinished) {
          notiAction('DANGER', 'Cant edit finished todo')
            return
        }
        setEditValue(description)
        setEditID(id)
    }
    const deleteHandle = () => {
        const confirmation = window.confirm('Are you sure to delete this todo ?')
        if(confirmation) {
            deleteTodo({ variables: { id : parseInt(id) } })
            notiAction('SAFE', `delete '${description}' todo successfully`)
        }
    }

    return (
        <div className='todo'>
          <li 
            style={{textDecoration: isFinished ? 'line-through': 'none', color: isFinished ? 'gray' : 'black'}} 
            onClick={() => updateTodo({ variables: { id : parseInt(id), isFinished: !isFinished } })}>
            {description}
          </li> 
          <button className='update-btn' onClick={updateHandle}>
            <FontAwesomeIcon icon={faPen}  />
            </button>
          <button className='trash-btn' onClick={deleteHandle}><FontAwesomeIcon icon={faTrash}/></button>
        </div>
    )
}

export default ReadOnlyRow