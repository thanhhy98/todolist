import { useContext } from "react"
import { NotificationContext } from "../context/notification/notiContext"

const Notification = () => {
    const { noti } = useContext(NotificationContext)
    return (
        <div className='noti'>
        <div className={noti.danger ? 'danger' : 'safe' }>
            <p>{noti.text}</p>
        </div>
    </div>
    )
}

export default Notification