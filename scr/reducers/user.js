const initialState = null
const REGISTRAR_USUARIO = "REGISTRAR_USUARIO"
const QUITAR_USUARIO = "QUITAR_USUARIO"

export const registrarUsuario = item => ({
    type: REGISTRAR_USUARIO,
    payload: item
})

export const quitarUsuario = item => ({
    type: QUITAR_USUARIO,
    payload: null
})

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRAR_USUARIO:
            return action.payload
        case QUITAR_USUARIO:
            return initialState
        default:
            return state
    }
    return state
}