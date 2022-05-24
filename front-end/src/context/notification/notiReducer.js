const notiReducer = (state, {type, text}) => {
    switch(type) {
        case 'DANGER':
            return {
                danger: true,
                text: text
            }
        case 'SAFE':
            return {
                danger: false,
                text
            }
        default :
            return state
    }
}

export default notiReducer