const initialState = 1
const INCREMENTAR = "INCREMENTAR"
const DECREMENTAR = "DECREMENTAR"
const REINICIAR = "REINICIAR"

export const incrementar = valor => ({
    type: INCREMENTAR,
})

export const decrementar = valor => ({
    type: DECREMENTAR,
})

export const reiniciar = () => ({
    type: REINICIAR,
})

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENTAR:
            return state + 1
        case DECREMENTAR:
            return state - 1
        case REINICIAR:
            return initialState
        default:
            return state
    }
    return state
}