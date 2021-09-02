import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Card, Divider } from 'react-native-elements'
import ButtonCustom from '../components/button.custom'
import ButtonOpacoCustom from '../components/button.opaco.custom'
import {addToShoppingcart,clearToShoppingcart,removeToShoppingcart} from '../reducers/shoppingcart'
import {reiniciar} from '../reducers/autokeys'
import {user} from '../reducers/user'
import {guardarCuenta} from '../reducers/cuenta'

const shopcart = ({navigation,shoppingcart,user,sistema,removeToShoppingcart,clearToShoppingcart,reiniciar,guardarCuenta}) => {
    const [total,setTotal] = useState(0)
    const [delivery,setDelivery] = useState(0)
    const [sindelivery,setSinDelivery] = useState(0)
    const [usuario,setUsuario] = useState(null)

    useEffect(() => {
        let _total = 0
        shoppingcart.map((item) => {
          _total = _total + item.total
        })
        setSinDelivery(_total)
        if(_total > 0){
          _total = _total + delivery
        }
        setTotal(_total)
        setUsuario(user)
        setDelivery(sistema.cargoDelivery)
    })

    useEffect(() => {
      guardarCuenta({orden:sindelivery,delivery:delivery,total:total})
    },[total])

    const onPressDeleteItem = (item) => {
      Alert.alert(
        'Quitar Item',
        '¿Desea quitar este item de su orden?',
        [
          {
            text: 'Aceptar',
            onPress: () => removeToShoppingcart(item)
          },
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelar')
          }
        ])      
    }

    const onPressCancelarTodo = () => {
      if(shoppingcart.length == 0){
        Alert.alert('Cancelar Orden','No hay pedidos en su orden actualmente.',[{text:'Aceptar'}])
        return
      }
      Alert.alert(
        'Cancelar Orden',
        '¿Desea cancelar toda la orden?',
        [
          {
            text: 'Aceptar',
            onPress: () => clearToShoppingcart()
          },
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelar')
          }
        ])            
    }

  return (
      <View style={styles.container}> 
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.containerStyle}
          data={shoppingcart}
          keyExtractor={item => String(item.key)}
          ListFooterComponent={
              ({item}) => 
                <View style={styles.itemFlatList}>
                    <Text style={styles.itemTitleStyle}>Resumen de su Orden</Text>                
                    <View style={styles.viewRowResumen}>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>monto de su orden =</Text>
                        </View>
                        <View style={styles.viewColumna2}>
                            <Text style={styles.itemPrecioStyle}>{format("${0}",sindelivery.toFixed(2))}</Text>
                        </View>
                    </View>

                    <View style={styles.viewRowResumen}>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>cargo por delivery +</Text>
                        </View>
                        <View style={styles.viewColumna2}>
                            <Text style={styles.itemPrecioStyle}>{format("${0}",delivery.toFixed(2))}</Text>
                        </View>
                    </View>

                    <Divider style={styles.divider} />                                                     
                    <View style={styles.viewRowResumen}>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemPrecioStyle}>total =</Text>
                        </View>
                        <View style={styles.viewColumna2}>
                            <Text style={styles.itemPrecioStyle}>{format("${0}",total.toFixed(2))}</Text>
                        </View>
                    </View>

                    <Divider style={styles.dividerHidden} />                                                     
                    <ButtonCustom text="Proceder a pagar" onPress={() => {
                      if(sistema.estadoStore == 'CERRADO'){
                        Alert.alert('Horario','Lo sentimos, la tienda esta cerrada en estos momentos. Intente en otro horario.')
                        return
                      }
                      if(total > 0){
                        if(usuario == null){
                          navigation.navigate('Login')
                        }else{
                          navigation.navigate('Pagar')
                        }
                      }else{
                        alert('No hay nada que pagar en su orden')
                      }
                    }} />
                    
                    <Divider style={styles.dividerHidden} />  
                    <Text style={styles.itemTitleStyle}>Eliminar su Orden</Text>                
                    <Text style={styles.itemLabelTextStyle}>Puedes eliminar todo el pedido limpiando por completo el carrito de compras.</Text>                                                  
                    <View style={{marginTop:5,marginBottom:1}}>
                      <ButtonOpacoCustom text="Eliminar orden" onPress={() => onPressCancelarTodo()} />
                    </View>
                </View>
          }
          renderItem={
            ({item}) => 
              <TouchableOpacity onPress={() => onPressDeleteItem(item)}>
                <View style={styles.itemFlatList}>
                    <Text style={styles.itemTitleStyle}>{item.nombre}</Text>
                    <Text style={styles.itemTextoStyle}>{item.descripcion}</Text>   
                    <Divider style={styles.divider} />                                                     
                    <View style={styles.viewRow}>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>cantidad</Text>
                        </View>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>precio</Text>
                        </View>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemPrecioStyle}>total</Text>
                        </View>
                    </View>
                    <View style={styles.viewRow}>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>{item.cantidad}</Text>
                        </View>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemTextoStyle}>{format('${0}',item.precio)}</Text>
                        </View>
                        <View style={styles.viewColumna3}>
                            <Text style={styles.itemPrecioStyle}>{format('${0}',item.total)}</Text>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>
          }
        />
      </View>
  );
}

//export default shopcart

const mapStateToProps = state => {
  //console.log(state.sistema)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  addToShoppingcart: (item) => dispatch(addToShoppingcart(item)),
  clearToShoppingcart: () => dispatch(clearToShoppingcart()),
  removeToShoppingcart: (item) => dispatch(removeToShoppingcart(item)),
  reiniciar: () => dispatch(reiniciar()),
  guardarCuenta: (cuenta) => dispatch(guardarCuenta(cuenta)),
})

export default connect(mapStateToProps,mapDispatchToProps)(shopcart)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#e6e4e7',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatlist: {
      flex:1,
    padding: 2,
    width: Dimensions.get('window').width,
    //backgroundColor: '#e6e4e7'
  },
  containerStyle:{
    paddingVertical: 8
  },
  itemFlatList:{
    padding:10,
    marginRight:10,
    marginLeft:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'#fff',
    marginTop:5,
    marginBottom:5,
  },
itemTitleStyle:{
  fontSize:18,
	color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
},
itemTextoStyle:{
  fontSize:16,
    color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
},
itemPrecioStyle:{
  fontSize:16,
	color: '#000000',
	textAlign: 'right',
  fontFamily: 'Ubuntu-Medium',  
  marginTop: 3,
  marginBottom: 3,  
},
itemLabelTextStyle:{
  fontSize:16,
	color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',
  marginTop:2,
  marginBottom:2,
},
viewColumna1:{
    flex:1,
    backgroundColor:'#ffffff',
    alignContent:'flex-end',
    flexDirection:'row-reverse',
},
viewColumna2:{
    flex:2,
    backgroundColor:'#ffffff',    
    alignContent:'flex-end',
    flexDirection:'row-reverse',
},
viewColumna3:{
    flex:3,
    flexDirection:'row-reverse',
    alignContent:'flex-end',
    backgroundColor:'#ffffff',    
},
viewRow:{
    flexDirection:'row',  
    alignItems: 'center', 
    marginTop:1    
},
divider:{
  backgroundColor: '#cac9c9',
  marginBottom:4,
  marginTop:10,
},
dividerHidden:{
  backgroundColor: '#ffffff',
  marginBottom:10,
  marginTop:5,
},
viewRowResumen:{
    flexDirection:'row',  
    alignItems: 'center', 
    marginTop:2,
    marginBottom:2,
    backgroundColor:'#ffffff'
},
});
