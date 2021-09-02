const initialState = {delivery:0,orden:0,total:0}
const GUARDAR_CUENTA = "GUARDAR_CUENTA"
const REINICIAR_CUENTA = "REINICIAR_CUENTA"

export const guardarCuenta = valor => ({
    type: GUARDAR_CUENTA,
    payload: valor
})

export const reiniciarCuenta = () => ({
    type: REINICIAR_CUENTA,
})

export default (state = initialState, action) => {
    switch (action.type) {
        case GUARDAR_CUENTA:
            return action.payload
        case REINICIAR_CUENTA:
            return initialState
        default:
            return state
    }
    return state
}