import { useState } from 'react'

const PopUp = ({
        setShowPopUp
    }) => {
        const [isChecked, setIsChecked] = useState(false)

        const checkHandle = e => {
            setIsChecked(e.target.checked)
        }       
        const handleSubmit = e => {
            e.preventDefault();
            if(isChecked) {
            localStorage.setItem('show', 'have_value')
            }
            setShowPopUp(false)
        }
        
        return (
            <div className='popup'>
                <form className='tip'>
                    <h2>Tip</h2>
                    <p>Click the todo title in the list to edit finish state</p>
                    <div className='check-box'>
                        <input type="checkbox" checked={isChecked} name='check' onChange={checkHandle} size='large'/>
                        Click the checkbox to dismiss the tip for next visits
                    </div>
                    <button onClick={handleSubmit}>OK</button>
                </form>
            </div>
        )
}

export default PopUp