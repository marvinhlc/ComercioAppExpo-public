/*const initialState = [
    {
        id:1,
        categoria: "Promociones",
        uri:""
    }, 
    {
        id:2,
        categoria: "Lentes de Contacto",
        uri:""
    }, 
    {
        id:3,
        categoria: "Lentes de Lectura",
        uri:""
    },         
    {
        id:4,
        categoria: "Lentes Oftálmicos",
        uri:""
    },   
    {
        id:5,
        categoria: "Lentes de Sol",
        uri:""
    },           
    {
        id:6,
        categoria: "Unisex",
        uri:""
    }, 
]*/

const initialState = null
const GUARDAR_CATEGORIAS = "GUARDAR_CATEGORIAS"
const QUITAR_CATEGORIAS = "QUITAR_CATEGORIAS"

export const guardarCategorias = valor => ({
    type: GUARDAR_CATEGORIAS,
    payload: valor    
})

export const quitarCategorias = valor => ({
    type: QUITAR_CATEGORIAS,
})


export default (state = initialState, action) => {
    switch (action.type) {
        case GUARDAR_CATEGORIAS:
            return action.payload
        case QUITAR_CATEGORIAS:
            return initialState
        default:
            return state
    }
    return state
}