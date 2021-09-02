import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Card, Divider, Input, Overlay, Icon } from 'react-native-elements'
import { AppLoading } from 'expo'
import ButtonCustom from '../components/button.custom'
import {addToShoppingcart,clearToShoppingcart,removeToShoppingcart} from '../reducers/shoppingcart'
import {reiniciar} from '../reducers/autokeys'
import {guardarCuenta,reiniciarCuenta} from '../reducers/cuenta'
import {guardarToken,quitarToken} from '../reducers/token'
import firebase from '../firebase'

const pagar = ({navigation,shoppingcart,cuenta,user,token,reiniciar,clearToShoppingcart,guardarToken,quitarToken}) => {
    const [overlayVisible,setOverlayVisible] = useState(false)
    const [formaPago,setFormaPago] = useState('TARJETA')
    //const [responsePasarelaPago,setResponsePasarela] = useState(null)
    const [tokenPasarela,setTokenPasarela] = useState(null)
    const [nombreCreditCard,setNombreCreditCard] = useState(null)
    const [numeroCreditCard,setNumeroCreditCard] = useState(null)
    const [yearCreditCard,setYearCreditCard] = useState(null)
    const [monthCreditCard,setMonthCreditCard] = useState(null)
    const [cvvCreditCard,setCvvCreditCard] = useState(null)
    const [pagoAprobado,setPagoAprobado] = useState(true)
    const [bottonEnabled,setBotonEnabled] = useState(true)
    const [conteo,setConteo] = useState(0)

    //PARA PODER USAR TIMEAGO
    let moment = require('moment');
    require('moment/locale/es-us');
    moment.locale('es-us');

  useEffect(() => {
    fetch('https://id.wompi.sv/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=client_credentials&client_id=2348af52-0f32-4fac-aeff-73e9ff28de16&client_secret=f52e220c-f03e-489b-822b-cfa75122138c&audience=wompi_api"
      }).then((response) => response.json())
      .then((response) => { 
        setTokenPasarela(response)
      })
      .catch((error) => console.log(error));      
  })

  const onPressAceptar = () => {
    setOverlayVisible(!overlayVisible)
    //setPagoAprobado(true)
    if(pagoAprobado){
      navigation.navigate('Cupones')
    }else{
      setBotonEnabled(true)
    }
  }

  const getDateTimeMoment = () => {
    return moment()
      .utcOffset('-06:00')
      .format('YYYY-MM-DD hh:mm:ss a');
  }

  const onPressPagar = () => {
    if(bottonEnabled == false){
      setConteo(0)
      //console.log('churro')
      return
    }
    setConteo(conteo+1)
    setBotonEnabled(false)
    console.log(conteo)
    Alert.alert(
      'Procesar Orden',
      'En este momento se procesará su orden cargando el monto a su tarjeta de crédito o débito. ¿Desea continuar?',
      [
        {
          text: 'Aceptar',
          onPress: () => onPressPagarWompi()
        },
        {
          text: 'Cancelar',
          onPress: () => {
            setBotonEnabled(true)
          }
        }
      ]) 
  }

  const onPressPagarWompi = () => {
    if(tokenPasarela != null){
      let _token = tokenPasarela.access_token
      fetch('https://api.wompi.sv/TransaccionCompra',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + _token
          },
          body: JSON.stringify({
            "tarjetaCreditoDebido": {
              "numeroTarjeta": numeroCreditCard,
              "cvv": cvvCreditCard,
              "mesVencimiento": monthCreditCard,
              "anioVencimiento": yearCreditCard
            },
            "monto": cuenta.total,
            "emailCliente": user.email,
            "nombreCliente": user.nombre
          })
        }).then((response) => response.json())
        .then((response) => {
          console.log('response... ok')
          if(response.esAprobada == true){
            setPagoAprobado(true)
            guardarDatosEnFirebase(response)
          }else{
            console.log('pago no fué aprobado')
            setPagoAprobado(false)
            setOverlayVisible(!overlayVisible)
            //setBotonEnabled(true)
          }
        })
        .catch((error) => {
          setBotonEnabled(true)
        })
    }else{
      setBotonEnabled(true)
    }
  }

  const guardarDatosEnFirebase = (response) => {
    if(user != null && response != null){
      firebase.database()
      .ref('ordenes')
      .push({
          uid: user.uid,
          email: user.email,
          direccion: user.direccion,
          telefono: user.telefono,
          items: shoppingcart,
          fechaCreacion: getDateTimeMoment(),
          fechaEntregado:'',
          estado: 'ACTIVO',
          formaPago: formaPago,
          pasarela: response,
          cuenta: cuenta
      })
      .then((data) => {
        console.log('firebase... ok')
        //setResponsePasarela(response)
        setOverlayVisible(!overlayVisible)
        clearToShoppingcart()
        //setBotonEnabled(true)
      })
      .catch((error) => {
        setBotonEnabled(true)
      })
    }
  }

  const setNombreCreditCardFromTextInput = (text) => {
    setNombreCreditCard(text)
  }

  const setNumeroCreditCardFromTextInput = (text) => {
    setNumeroCreditCard(text)
  }

  const setYearCreditCardFromTextInput = (text) => {
    setYearCreditCard(text)
  }

  const setMonthCreditCardFromTextInput = (text) => {
    setMonthCreditCard(text)
  }

  const setCvvCreditCardFromTextInput = (text) => {
    setCvvCreditCard(text)
  }

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.itemTitleStyle}>Resumen de su Orden</Text>                
                <View style={styles.viewRowResumen}>
                    <View style={styles.viewColumna3}>
                        <Text style={styles.itemTextoStyle}>monto de su orden =</Text>
                    </View>
                    <View style={styles.viewColumna2}>
                        <Text style={styles.itemPrecioStyle}>{format("${0}",cuenta.orden.toFixed(2))}</Text>
                    </View>
                </View>

                <View style={styles.viewRowResumen}>
                    <View style={styles.viewColumna3}>
                        <Text style={styles.itemTextoStyle}>cargo por delivery +</Text>
                    </View>
                    <View style={styles.viewColumna2}>
                        <Text style={styles.itemPrecioStyle}>{format("${0}",cuenta.delivery.toFixed(2))}</Text>
                    </View>
                </View>

                <Divider style={styles.divider} />                                                     
                <View style={styles.viewRowResumen}>
                    <View style={styles.viewColumna3}>
                        <Text style={styles.itemPrecioStyle}>total =</Text>
                    </View>
                    <View style={styles.viewColumna2}>
                        <Text style={styles.itemPrecioStyle}>{format("${0}",cuenta.total.toFixed(2))}</Text>
                    </View>
                </View>

                <View style={{marginTop:20}}>
                  <Text style={styles.itemTitleStyle}>Datos de tarjeta</Text>
                </View>

                <View style={{marginTop:5}}>
                    <Text style={styles.itemLabelTextStyle}>Nombre según tarjeta</Text>                                 
                    <TextInput onChangeText={(text) => setNombreCreditCardFromTextInput(text)} style={styles.inputContainerStyle} placeholder='ej. Juan Perez' />
                    <Text style={styles.itemLabelTextStyle}>Numero de tarjeta</Text>                                     
                    <TextInput onChangeText={(text) => setNumeroCreditCardFromTextInput(text)} style={styles.inputContainerStyle} keyboardType='number-pad' placeholder='0000 0000 0000 0000' />   

                    <View style={styles.viewColumna1}>
                        <View style={{paddingRight:5,flex:2}}>
                          <Text style={styles.itemLabelTextStyle}>Año vencimiento</Text>                 
                          <TextInput onChangeText={(text) => setYearCreditCardFromTextInput(text)} style={styles.inputContainerStyle} keyboardType='number-pad' placeholder='0000' />
                        </View>
                        <View style={{paddingLegt:5,flex:2}}>                        
                          <Text style={styles.itemLabelTextStyle}>Mes vencimiento</Text>                                         
                          <TextInput onChangeText={(text) => setMonthCreditCardFromTextInput(text)} style={styles.inputContainerStyle} keyboardType='number-pad' placeholder='00' />                        
                        </View>
                    </View>
                    <Text style={styles.itemLabelTextStyle}>Codigo CVV (reverso de tarjeta)</Text>                                     
                    <View style={styles.viewColumna1}>
                        <TextInput onChangeText={(text) => setCvvCreditCardFromTextInput(text)} style={styles.inputContainerStyle} keyboardType='number-pad' placeholder='CVV' />
                    </View>                    
                </View>  
                <View style={{marginTop:10,marginBottom:5}}>
                  {bottonEnabled
                  ?
                    <ButtonCustom
                      activeOpacity={bottonEnabled ? 1 : 0.7}
                      text='Proceder a pagar' 
                      onPress={() => onPressPagar()} />                              
                  :
                    <View style={{height:50, flex:1,justifyContent:'center', alignItems:'center'}}>
                    <AppLoading/>
                    </View>
                  }
                </View>
            </View>

            <Overlay isVisible={overlayVisible} onBackdropPress={() => onPressAceptar()}>
              <View style={{padding:50}}>
                {pagoAprobado
                ?
                <View style={{marginTop:20,marginBottom:20}}>
                    <View style={{alignItems:'center'}} >
                      <Icon name="check-circle" style={{marginTop:20, marginBottom:20}} size={80}/>
                    </View>
                    <Text style={styles.itemTextOverlayStyle}>¡Transaccion Exitosa!</Text>                  
                </View>
                :
                <View style={{marginTop:20,marginBottom:20}}>
                    <View style={{alignItems:'center'}} >
                      <Icon name="highlight-off" style={{marginTop:20, marginBottom:20}} size={80}/>
                    </View>
                    <Text style={styles.itemTextOverlayStyle}>La transacción no fué aprobada</Text>                  
                </View>                
                }
                <ButtonCustom text='Aceptar' onPress={() => onPressAceptar()}/>
              </View>
            </Overlay>
        </ScrollView>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  reiniciar: () => dispatch(reiniciar()),
  clearToShoppingcart: () => dispatch(clearToShoppingcart()),
  guardarCuenta: (cuenta) => dispatch(guardarCuenta(cuenta)),
  guardarToken: (token) => dispatch(guardarToken(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(pagar)

const styles = StyleSheet.create({
container: {
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
contentContainer: {
  paddingVertical: 10
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
viewRowResumen:{
    flexDirection:'row',  
    alignItems: 'center', 
    marginTop:2,
    marginBottom:2,
    backgroundColor:'#ffffff'
},
divider:{
  backgroundColor: '#cac9c9',
  marginBottom:4,
  marginTop:10,
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
inputContainerStyle:{
    flex:1,
    padding: 5,
    paddingLeft:10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#cdcbcb',
    backgroundColor: '#fdfcfc',
    borderWidth: 1,
    borderRadius: 5,   
    fontSize:20,
    color: '#000000',
	textAlign: 'left',
    fontFamily: 'Ubuntu-Regular',    
},
viewColumna1:{
    flex:1,
    backgroundColor:'#ffffff',
    alignContent:'center',
    flexDirection:'row',
},
itemTextOverlayStyle:{
  fontSize:22,
  color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
  marginTop:5,
},
});
