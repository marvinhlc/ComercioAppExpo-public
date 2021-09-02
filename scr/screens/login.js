import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Divider, Input, Overlay, Icon } from 'react-native-elements'
import ButtonCustom from '../components/button.custom'
import {registrarUsuario,quitarUsuario} from '../reducers/user'
import firebase from '../firebase'

const login = ({navigation,registrarUsuario,quitarUsuario}) => {
  const [user,setUser] = useState(null)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [mensaje,setMensaje] = useState('')

  useEffect(() => {
    const ac = new AbortController();
    firebase.auth().onAuthStateChanged((okuser) => {
      if (okuser != null) {
        setUser(okuser)
      }
    })
    return () => ac.abort();
  })

  const setEmailFromTextInput = (text) => {
    setEmail(text)
  }

  const setPasswordFromTextInput = (text) => {
    setPassword(text)
  }

  const dispatchRegistrarUsuario = (okuser) => {
    firebase.database()
    .ref("usuarios/"+okuser.uid)
    .once('value')
    .then((snapshot) => {
      let datos = snapshot.val();
      registrarUsuario({
          displayName: okuser.displayName,
          email: okuser.email,
          phoneNumber: okuser.phoneNumber,
          photoURL: okuser.photoURL,
          uid: okuser.uid,
          nombre: datos != null ? datos.nombre : '',
          direccion: datos != null ? datos.direccion : '',
          telefono: datos != null ? datos.telefono : ''
        })
    })
    navigation.goBack()
  }

  async function signInWithEmail() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(okuser => dispatchRegistrarUsuario(okuser.user))
      .catch(error => {
        console.log(error)
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            setMensaje('Error en los datos')
          } else {
              setMensaje(errorMessage)
          }
      })
  }

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.itemTitleStyle}>Iniciar Sesión</Text>                
                <View style={{marginTop:5}}>
                    <Text style={styles.itemLabelTextStyle}>Correo electrónico</Text>                                 
                    <TextInput 
                      style={styles.inputContainerStyle} 
                      onChangeText={(text) => setEmailFromTextInput(text)} 
                      autoCapitalize="none" />
                    <Text style={styles.itemLabelTextStyle}>Credencial</Text>                                     
                    <TextInput 
                      style={styles.inputContainerStyle} 
                      secureTextEntry={true} 
                      onChangeText={(text) => setPasswordFromTextInput(text)} 
                      autoCapitalize="none" />   
                </View>

                {mensaje != ''
                ?
                  <View>
                    <View style={{marginTop:10,marginBottom:10}}>
                        <ButtonCustom text='Iniciar sesión' onPress={() => signInWithEmail()} />                              
                    </View>

                    <View style={{marginTop:10,marginBottom:10}}>
                      <Text style={styles.errorStyle} >{mensaje}</Text>
                    </View>
                  </View>
                :
                  <View style={{marginTop:10,marginBottom:10}}>
                      <ButtonCustom text='Iniciar sesión' onPress={() => signInWithEmail()} />                              
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

export default connect(mapStateToProps,mapDispatchToProps)(login)

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
