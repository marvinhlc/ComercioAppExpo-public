import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Card, Divider, Input, Overlay, Icon } from 'react-native-elements'
import ButtonCustom from '../components/button.custom'
import {registrarUsuario,quitarUsuario} from '../reducers/user'
import firebase from '../firebase'

const registrarse = ({navigation,registrarUsuario,quitarUsuario}) => {
  const [user,setUser] = useState(null)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [confirmar,setConfirmar] = useState(null)
  const [mensaje,setMensaje] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((okuser) => {
      if (okuser != null) {
          //console.log(okuser)
          setUser(okuser)
      }
    })
  })

  useEffect(() => {
    if(user != null){
        registrarUsuario({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
        })
        //user.sendEmailVerification()
    }
  },[user])

  const setEmailFromTextInput = (text) => {
    setEmail(text)
    //console.log(text)
  }

  const setPasswordFromTextInput = (text) => {
    setPassword(text)
    //console.log(text)
  }

  const setConfirmarFromTextInput = (text) => {
      setConfirmar(text)
      //console.log(text)
  }

  async function crearUsuarioWithEmail() {
      if(password != confirmar){
          setMensaje('Las credenciales deben ser iguales')
          return
      }
      
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
          setMensaje('Usuario creado correctamente!')
          result.user.sendEmailVerification()
          navigation.goBack()
        })
      .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            console.log("Usuario ya existe")
            setMensaje("Usuario ya existe")
          } 
          if (error.code === 'auth/invalid-email') {
             console.log('Datos no son validos');
             setMensaje('Datos de autenticación invalidos')
          }
          console.log(errorMessage)
          setMensaje(errorMessage)
      });
  }

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.itemTitleStyle}>Registrarse como usuario</Text>                
                <View style={{marginTop:5}}>
                    <Text style={styles.itemLabelTextStyle}>Correo electrónico</Text>                                 
                    <TextInput 
                      style={styles.inputContainerStyle} 
                      onChangeText={(text) => setEmailFromTextInput(text)} 
                      placeholder='ej. nombre@dominio.com' 
                      keyboardType='email-address' 
                      autoCapitalize="none" />
                    <Text style={styles.itemLabelTextStyle}>Credencial</Text>                                     
                    <TextInput 
                      style={styles.inputContainerStyle} 
                      secureTextEntry={true} 
                      onChangeText={(text) => setPasswordFromTextInput(text)} 
                      autoCapitalize="none" />   
                    <Text style={styles.itemLabelTextStyle}>Confirmar credencial</Text>                                     
                    <TextInput 
                      style={styles.inputContainerStyle} 
                      secureTextEntry={true} 
                      onChangeText={(text) => setConfirmarFromTextInput(text)} 
                      autoCapitalize="none" />                       
                </View>

              {mensaje == ''
              ?
                <View>
                  <View style={{marginTop:10,marginBottom:10}}>
                    <ButtonCustom text='Crear cuenta' onPress={() => crearUsuarioWithEmail()} />                              
                  </View>
                </View>
              :
                <View>
                  <View style={{marginTop:10,marginBottom:10}}>
                    <ButtonCustom text='Crear cuenta' onPress={() => crearUsuarioWithEmail()} />                              
                  </View>
                  <View style={{marginTop:10,marginBottom:10}}>
                    <Text style={styles.errorStyle} >{mensaje}</Text>
                  </View>
                </View>
              }
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

export default connect(mapStateToProps,mapDispatchToProps)(registrarse)

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