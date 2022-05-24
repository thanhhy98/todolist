import {createContext, useReducer, useRef} from 'react'
import notiReducer from './notiReducer'

export const NotificationContext = createContext()

const init = {
    danger: false,
    text: ''
}

const NotificationProvider = ({children}) => {
  const [noti, notiDispatch] = useReducer(notiReducer, init)
  const time = useRef(null)

  const notiAction = (type, text) => {
    notiDispatch({
      type,
      text
    })
    if(time) {
      clearTimeout(time.current)
    }
    time.current = setTimeout(() => {
      notiDispatch({
        type,
        text: ''
      })
    }, 3000)
  }

  const data = { 
    noti,
    notiAction
  }

  return (
    <NotificationContext.Provider value={data}>
    {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider