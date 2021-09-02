const initialState = null
const GUARDAR_TOKEN = "GUARDAR_TOKEN"
const QUITAR_TOKEN = "QUITAR_TOKEN"

export const guardarToken = valor => ({
    type: GUARDAR_TOKEN,
    payload: valor    
})

export const quitarToken = valor => ({
    type: QUITAR_TOKEN,
})

export default (state = initialState, action) => {
    switch (action.type) {
        case GUARDAR_TOKEN:
            return action.payload
        case QUITAR_TOKEN:
            return initialState
        default:
            return state
    }
    return state
}