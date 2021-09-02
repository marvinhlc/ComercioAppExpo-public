const initialState = null
const REGISTRAR_SISTEMA = "REGISTRAR_SISTEMA"
const QUITAR_SISTEMA = "QUITAR_SISTEMA"

export const registrarSistema = item => ({
    type: REGISTRAR_SISTEMA,
    payload: item
})

export const quitarSistema = () => ({
    type: QUITAR_SISTEMA,
    payload: null
})

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRAR_SISTEMA:
            return action.payload
        case QUITAR_SISTEMA:
            return initialState
        default:
            return state
    }
    return state
}