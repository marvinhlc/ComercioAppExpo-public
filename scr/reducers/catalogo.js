/*const initialState = [
      {
        id:1,
        nombre: "Lacost Magnum PI",
        cupon:"Las gafas de marca Lacoste L899S están fabricadas con Nylon y cristales Plástico en . Con una excelente combinación de colores como las monturas Blanco con los cristales Verde , las gafas de sol de Lacoste son un must-have de esta temporada. Consíguelas en SmartBuyGlasses hoy y obtén 2 años de garantía y 100 días de devolución.",
        descripcion: "Las gafas de marca Lacoste L899S están fabricadas con Nylon y cristales Plástico",
        precio:83.25,
        uri: 'https://firebasestorage.googleapis.com/v0/b/couponmarket-fa85e.appspot.com/o/catalogo%2F61T2DK%2B7SVL._AC_UX679_.jpg?alt=media&token=e2dba37e-e014-4e6a-bfc8-153edddc572d',
        fecha_vencimiento: "2020-08-25",  
        existencia: 5,     
        vendidos: 0,
        disponible:true,
        categoria:'Promociones',
      }, 
      {
        id:2,
        nombre: "Diesel DL20456",        
        cupon:"Las gafas de marca Lacoste L899S están fabricadas con Nylon y cristales Plástico en . Con una excelente combinación de colores como las monturas Blanco con los cristales Verde , las gafas de sol de Lacoste son un must-have de esta temporada. Consíguelas en SmartBuyGlasses hoy y obtén 2 años de garantía y 100 días de devolución.",
        descripcion: "Las gafas de marca Lacoste L899S están fabricadas con Nylon y cristales Plástico",        
        precio:75.85,
        uri: 'https://firebasestorage.googleapis.com/v0/b/couponmarket-fa85e.appspot.com/o/catalogo%2F61pnnLxBEGL._AC_UX679_.jpg?alt=media&token=fdc4286a-5331-4d43-856d-480e24b9a158',
        fecha_vencimiento: "2020-08-28",    
        existencia: 2,  
        vendidos: 0,
        disponible:true,
        categoria:'Promociones',                       
      }, 
      {
        id:3,
        nombre: "Vogue Eyewear VO5211S",
        cupon:"Echa un vistazo a las exitosas gafas de sol Vogue Eyewear VO5211S by Gigi Hadid en Negro . Hechas de Plástico , las gafas de sol tienen cristales Rojo y una protección total UV. En SmartBuyGlasses , ofrecemos autenticidad de las gafas de sol Vogue Eyewear y vienen con una garantía de 24 meses para asegurar su alta calidad y durabilidad.",
        descripcion: "Echa un vistazo a las exitosas gafas de sol Vogue Eyewear VO5211S by Gigi Hadid en Negro",        
        precio:64.75,
        uri: 'https://firebasestorage.googleapis.com/v0/b/couponmarket-fa85e.appspot.com/o/catalogo%2F71V8IOji2YL._UX679_.jpg?alt=media&token=ada23836-7ca7-48d4-8de3-b7a102d4a9b7',
        fecha_vencimiento: "2020-06-10",    
        existencia: 4,  
        vendidos: 0,
        disponible:true,
        categoria:'Lentes de Lectura',
      },     
      {
        id:4,
        nombre: "RayBan Starlight",
        cupon:"Las gafas de marca Lacoste L899S están fabricadas con Nylon y cristales Plástico en . Con una excelente combinación de colores como las monturas Blanco con los cristales Verde , las gafas de sol de Lacoste son un must-have de esta temporada. Consíguelas en SmartBuyGlasses hoy y obtén 2 años de garantía y 100 días de devolución.",
        descripcion: "Echa un vistazo a las exitosas gafas de sol Vogue Eyewear VO5211S by Gigi Hadid en Negro",
        precio:63.45,
        uri: 'https://firebasestorage.googleapis.com/v0/b/couponmarket-fa85e.appspot.com/o/catalogo%2Ffangame.jpg?alt=media&token=a5220713-a99a-469f-92f0-e79fd3c8d18b',
        fecha_vencimiento: "2020-06-10",
        existencia: 5,  
        vendidos: 0,
        disponible:true,
        categoria:'Lentes de Lectura',                         
      }, 
]*/

const initialState = {datos:[],filtrado:[],valido:false}
const GUARDAR_CATALOGO = "GUARDAR_CATALOGO"
const QUITAR_CATALOGO = "QUITAR_CATALOGO"
const FILTRAR_POR_CATEGORIA = "FILTRAR_POR_CATEGORIA"

export const guardarCatalogo = valor => ({
    type: GUARDAR_CATALOGO,
    payload: valor    
})

export const quitarCatalogo = valor => ({
    type: QUITAR_CATALOGO,
})

export const filtrarPorCategoria = valor => ({
  type: FILTRAR_POR_CATEGORIA,
  payload: valor
})

export default (state = initialState, action) => {
    switch (action.type) {
        case GUARDAR_CATALOGO:
            let newState = {
                datos:action.payload,
                filtrado:action.payload,
                valido:true
              }
            return newState
        case QUITAR_CATALOGO:
            return initialState
        case FILTRAR_POR_CATEGORIA:
            state.filtrado = state.datos.filter(item => item.categoria === action.payload)
            state.valido = true
            return state
        default:
            return state
    }
    return state
}