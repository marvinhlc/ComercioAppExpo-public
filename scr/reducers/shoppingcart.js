const initialState = []
const AGREGAR_AL_CARRITO = "AGREGAR_AL_CARRITO"
const QUITAR_DEL_CARRITO = "QUITAR_DEL_CARRITO"
const LIMPIAR_EL_CARRITO = "LIMPIAR_EL_CARRITO"

export const addToShoppingcart = item => ({
    type: AGREGAR_AL_CARRITO,
    payload: item
})

export const removeToShoppingcart = item => ({
    type: QUITAR_DEL_CARRITO,
    payload: item
})

export const clearToShoppingcart = () => ({
    type: LIMPIAR_EL_CARRITO,
    payload: null
})

export default (state = initialState, action) => {
    switch (action.type) {
        case AGREGAR_AL_CARRITO:
            return [...state, action.payload]
        case QUITAR_DEL_CARRITO:
            return state.filter(item => item !== action.payload)
        case LIMPIAR_EL_CARRITO:
            return initialState
        default:
            return state
    }
    return state
}