import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Select from './Select';
import { GET_TODOS, ADD_TODO } from '../gql';
import { useMutation } from '@apollo/client';
import { NotificationContext } from '../context/notification/notiContext';

const InputForm = ({ editID }) => {
    const [createTodo] = useMutation(ADD_TODO,  {refetchQueries: [
        GET_TODOS,
        'GetTodos' 
      ], });
    const [createValue, setCreateValue] = useState('')
    const { notiAction } = useContext(NotificationContext)
    const handleSubmit = e => {
            e.preventDefault()
            if(editID) return
            createTodo({ variables: { description: createValue, isFinished: false } })
            notiAction('SAFE', `'${createValue}' todo is created successfully!`)
            setCreateValue('')
    }
    return (
        <form className="App" onSubmit={handleSubmit}>
        <input value={createValue} onChange={e => setCreateValue(e.target.value)}/>
        <button>
        <FontAwesomeIcon icon={faPlus} size="2xs"/>
              </button>
      <Select />
      </form>
    )
}

export default InputForm;