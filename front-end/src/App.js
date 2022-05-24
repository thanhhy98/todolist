import './index.css';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect, useContext } from 'react'
import { SelectContext } from './context/SelectContext';
import {GET_TODOS, UPDATE_TODO} from './gql'
import ReadOnlyRow from './components/ReadOnlyRow';
import InputForm from './components/InputForm';
import EditableRow from './components/EditableRow';
import PopUp from './components/PopUp';
import Notification from './components/Notification';
import { NotificationContext } from './context/notification/notiContext';

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [updateTodo, obj] = useMutation(UPDATE_TODO,  {refetchQueries: [
    GET_TODOS,
    'GetTodos' 
  ], });

  const [editID, setEditID] = useState(null)
  const [ editValue, setEditValue ] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)
  const { noti } = useContext(NotificationContext)
  const { selectedValue } = useContext(SelectContext)

  useEffect( () => {
    const isLS = localStorage.getItem('show') ? true : false
    if( isLS ) {
      return
    } 
    setShowPopUp(true)
    const tShowPopUp = setTimeout(() => {
      setShowPopUp(false)
    }, 9000)
    return () => {
      clearTimeout(tShowPopUp)
    }
  }, [])

  if (loading) return (
    <div className='exception'>
      Loading...
    </div>
  );

  if (error) return `Error! ${error.message}`;
  const { todos } = data
  const realData = selectedValue === 'all'
  ? todos
  : todos.filter(item => item.isFinished.toString() === selectedValue)
   
  return (
    <>
    { showPopUp 
      && <PopUp setShowPopUp={setShowPopUp} /> }
      {noti.text && <Notification />}
    <header>To do app</header>
    <InputForm 
      editID={editID}
    />
    <div className="list-container">
      <ul className='todo-list'>
        {realData.map(({id, description, isFinished}) => {
          return editID !== id
          ? (
          <ReadOnlyRow
            key={id} 
            isFinished={isFinished}
            description={description}
            updateTodo={updateTodo}
            setEditID={setEditID}
            setEditValue={setEditValue}
            id={id}
          /> 
          ) 
          : (
          <EditableRow 
            key={id}
            id={id}
            setEditID={setEditID}
            description={description}
            editValue={editValue}
            setEditValue={setEditValue}
            updateTodo={updateTodo}
            obj={obj}
          /> 
          )
        }      
        )}
      </ul>
    </div>
    </>
  );
}

export default App;
