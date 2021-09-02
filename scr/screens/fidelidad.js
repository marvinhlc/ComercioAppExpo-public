import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Divider, Input, Overlay, Icon, Badge } from 'react-native-elements'
import ButtonCustom from '../components/button.custom'
import {registrarUsuario,quitarUsuario} from '../reducers/user'
import firebase from '../firebase'
import {dispatchDefaultMessage} from '../components/mensaje.custom'

const fidelidad = ({navigation,user,registrarUsuario,quitarUsuario}) => {
  const [puntos,setPuntos] = useState(0)

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.itemTitleStyle}>Cliente frecuente</Text>  
                <Text style={styles.itemLabelTextStyle}>Este es un resumen de su tarjeta de cliente frecuente de este comercio.</Text> 
                
                <View style={{marginTop:10,marginBottom:5}}>
                  <View style={styles.viewRowResumen}>
                      <View style={styles.viewColumna3}>
                          <Text style={styles.itemTextoStyle}>puntos =</Text>
                      </View>
                      <View style={styles.viewColumna2}>
                          <Badge 
                            status="primary" 
                            badgeStyle={{height:30,width:60}} 
                            textStyle={{fontFamily:'Ubuntu-Light',fontSize:16}}
                            value={puntos} />
                      </View>
                  </View>

                  <View style={styles.viewRowResumen}>
                      <View style={styles.viewColumna3}>
                          <Text style={styles.itemTextoStyle}>regalos =</Text>
                      </View>
                      <View style={styles.viewColumna2}>
                          <Badge 
                            status="success" 
                            badgeStyle={{height:30,width:60}} 
                            textStyle={{fontFamily:'Ubuntu-Light',fontSize:16}}
                            value={puntos} />
                      </View>
                  </View>                  

                  <View style={styles.viewRowResumen}>
                      <View style={styles.viewColumna3}>
                          <Text style={styles.itemTextoStyle}>descuentos =</Text>
                      </View>
                      <View style={styles.viewColumna2}>
                          <Badge 
                            status="error" 
                            badgeStyle={{height:30,width:60}} 
                            textStyle={{fontFamily:'Ubuntu-Light',fontSize:16}}
                            value={puntos} />
                      </View>
                  </View>

                </View>

                <View style={{marginTop:10,marginBottom:5}}>
                    <ButtonCustom text='Mostrar QR' onPress={() => 
                      dispatchDefaultMessage('Codigo QR','Se esta mostrando el codigo QR')} />                              
                </View>
            </View>        
        </ScrollView>
  );
}

const mapStateToProps = state => {
  //console.log(state)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  registrarUsuario: (user) => dispatch(registrarUsuario(user)),
  quitarUsuario: () => dispatch(quitarUsuario()),
})

export default connect(mapStateToProps,mapDispatchToProps)(fidelidad)

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
viewRowResumen:{
    flexDirection:'row',  
    alignItems: 'center', 
    marginTop:2,
    marginBottom:2,
    backgroundColor:'#ffffff'
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
itemTextoStyle:{
  fontSize:16,
    color: '#000000',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
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
itemLinkStyle:{
  fontSize:16,
	color: '#4c8fd6',
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
errorStyle:{
  fontSize:16,
	color: '#fd7272',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',
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

});
