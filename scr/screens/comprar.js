import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Alert, Linking } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { format } from 'react-string-format';
import TimeAgo from 'react-native-timeago';
import NumericInput from 'react-native-numeric-input'
import ButtonCustom from '../components/button.custom'
import NumerosInput from '../components/numerosinput.custom'
import {addToShoppingcart,clearToShoppingcart} from '../reducers/shoppingcart'
import {incrementar,decrementar,reiniciar} from '../reducers/autokeys'
import { connect } from 'react-redux'

const Comprar = ({navigation,shoppingcart,sistema,addToShoppingcart,clearToShoppingcart,incrementar,reiniciar,autokeys}) => {
    const [cantidad,setCantidad] = useState(1)
    const [total,setTotal] = useState(0)
    const [contador,setContador] = useState(0)
    const item = navigation.getParam('item','no existe')

    useEffect(() => {
        setTotal(cantidad * item.precio)
    })

    const setCantidadVender = (value) => {
        setCantidad(value)
        setTotal(value * item.precio)
    }

    const incrementarContador = () => {
      setContador(contador + 1)
    }

    const enviarNotificacionToWhatsapp = useCallback(() => {
      Linking.canOpenURL("whatsapp: // send? Text = oi")
        .then((supported) => {            
          if(supported){
            return Linking.openURL("whatsapp: // send? phone = 50379862145 & text = Hola Marvin")
          }else{
            console.log('enviando por API')
            return Linking.openURL("https://wa.me/50379862145?text=Hola Marvin")
          }
        })
    },[])

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>  
              <View style={{marginBottom:10}}>
                <Image source={{uri:item.uri}} style={styles.card_image} />    
              </View>
              <Text style={styles.itemNameStyle}>{item.nombre}</Text>
              <Text style={styles.itemTextStyle}>{item.descripcion}</Text>

              <Divider style={styles.divider} />
                <View style={{flexDirection:'row',  alignItems: 'center',}}>
                    <View style={styles.viewColumna}>
                        <Text style={styles.itemVencimientoStyle}>vencimiento</Text>
                    </View>
                    <View style={{alignContent:'flex-end',flex:1,flexDirection:'row-reverse',}}>
                        <TimeAgo style={styles.itemPrecioStyle} time={item.fecha_vencimiento} interval={20000} hideAgo={false} />          
                    </View>
                </View>

                <View style={{flexDirection:'row',  alignItems: 'center',}}>
                    <View style={styles.viewColumna}>
                        <Text style={styles.itemVencimientoStyle}>precio</Text>
                    </View>
                    <View style={{alignContent:'flex-end',flex:1,flexDirection:'row-reverse',}}>
                        <Text style={styles.itemPrecioStyle}>{format('${0}',item.precio)}</Text>
                    </View>
                </View>             

                <View style={{flexDirection:'row',  alignItems: 'center',}}>
                    <View style={styles.viewColumna}>
                        <Text style={styles.itemVencimientoStyle}>total</Text>
                    </View>
                    <View style={{alignContent:'flex-end',flex:1,flexDirection:'row-reverse',}}>
                        <Text style={styles.itemPrecioStyle}>{format('${0}',total.toFixed(2))}</Text>
                    </View>
                </View>                
                <Divider style={styles.divider} />                
                <View style={{alignItems: 'center',}}>
                    <NumericInput
                        containerStyle={styles.Numericinputstyle}
                        initValue={cantidad}
                        minValue={1}
                        maxValue={item.existencia}
                        rounded={true}
                        totalWidth={150}
                        totalHeight={50}
                        intpuSyle={styles.Numericinputstyle}
                        rightButtonBackgroundColor="#fff"
                        leftButtonBackgroundColor="#fff"
                        onChange={value => setCantidadVender(value)}
                        onLimitReached={() => alert('Este es nuestro límite para este producto. Gracias!')}
                    />
                </View>
                <View style={{marginBottom:5,marginTop:5}}>
                    <ButtonCustom text='Agregar a mi pedido' onPress={() => {
                      if(sistema.estadoStore == 'CERRADO'){
                        Alert.alert('Horario','Lo sentimos, la tienda esta cerrada en estos momentos. Intente en otro horario.')
                        return
                      }
                      if(item.existencia == 0 && sistema.reglaExistencias){
                        Alert.alert('Existencia','Lo sentimos, parece que no tenemos más existencias de este producto.')
                        return                        
                      }
                      addToShoppingcart({
                            fbkey: item.fbkey,
                            key: autokeys,
                            id: item.id,
                            cupon: item.cupon,
                            descripcion: item.descripcion,
                            nombre: item.nombre,
                            fecha_vencimiento: item.fecha_vencimiento,
                            precio: item.precio,
                            existencia: item.existencia,
                            uri: item.uri,
                            cantidad: cantidad,
                            total: total
                        })
                        Alert.alert('Agregar','Se ha agregado el producto a su orden',[
                            {
                                text: 'Aceptar',
                                onPress: () => {
                                  incrementar()
                                  navigation.goBack()
                                }
                            }
                        ])
                    }} />
                </View>
                
                <View style={{marginTop:10}}>
                  <Text style={styles.itemTitleStyle}>Atención al cliente</Text>                
                  <View style={{marginTop:5,marginBottom:5}}>
                      <Text style={styles.itemTextStyle}>Puede iniciar un chat para hacer una consulta acerca de este producto.</Text>                                
                  </View>  
                  <View style={{marginBottom:5}}>                
                    <ButtonCustom text='Iniciar chat' onPress={() => navigation.navigate('Chat')}/>
                  </View>
                </View>
            </View>
        </ScrollView>
  );
}    

//export default Comprar

const mapStateToProps = state => {
  //console.log(state.shoppingcart)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  addToShoppingcart: (item) => dispatch(addToShoppingcart(item)),
  clearToShoppingcart: () => dispatch(clearToShoppingcart()),
  incrementar: () => dispatch(incrementar()),
  reiniciar: () => dispatch(reiniciar())
})

export default connect(mapStateToProps,mapDispatchToProps)(Comprar)

const styles = StyleSheet.create({
container: {
  padding:10,
  marginRight:10,
  marginLeft:10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#fff',
  backgroundColor:'#fff',
  marginTop:8,
  marginBottom:8,
},
contentContainer: {
  paddingVertical: 10
},
itemStyle:{
    marginTop:2,
    marginBottom:2,
},
itemNameStyle:{
  fontSize:22,
    color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
},
itemTitleStyle:{
  fontSize:18,
	color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
},
itemTextStyle:{
  fontSize:16,
	color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',
},
itemPrecioStyle:{
  fontSize:16,
	color: '#000000',
	textAlign: 'right',
  fontFamily: 'Ubuntu-Medium',  
  marginTop: 10,
  marginBottom: 3,  
},
itemTimeagoStyle:{
  fontSize:16,
	color: '#8f8a8a',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 3,
},
itemVencimientoStyle:{
  fontSize:16,
    color: '#000000',
	textAlign: 'right',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
},
card:{
  backgroundColor: '#ffffff',
  marginLeft:5,
  marginRight:5
},
card_image:{
  resizeMode: 'stretch',
  //width: 400,
  height: 200,
},
divider:{
  backgroundColor: '#cac9c9',
  marginBottom:4,
  marginTop:10,
},
Numericinputstyle:{
    marginTop:15,
    marginBottom:5,
},
viewColumna:{
    flex:1
}
});