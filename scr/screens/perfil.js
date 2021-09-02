import React,{useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, FlatList, Dimensions, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { format } from 'react-string-format';
import { Divider, Input, Overlay, Icon } from 'react-native-elements'
import ButtonCustom from '../components/button.custom'
import {registrarUsuario,quitarUsuario} from '../reducers/user'
import firebase from '../firebase'

const perfil = ({navigation,user,registrarUsuario,quitarUsuario}) => {
    const [email,setEmail] = useState('')
    const [nombre,setNombre] = useState('')
    const [direccion,setDireccion] = useState('')
    const [telefono,setTelefono] = useState('')
    const [mensaje,setMensaje] = useState('')

    useEffect(() => {
      if(user != null){
        setNombre(user.nombre)
        setDireccion(user.direccion)
        setTelefono(user.telefono)
      }
    },[user])

    const cerrarSesionUsuario = () => {
        if(user != null){
            firebase.auth().signOut().then(() => {
                quitarUsuario();
            }, (error) => {
                console.log(error)
            })
        }
    }

    const enviarCorreoResetPassword = () => {
        if(user != null){
            firebase.auth()
            .sendPasswordResetEmail(user.email)
            .then(() => console.log('Compruebe su email'))
            .catch((error) => console.log(error))
        }
    }

    const guardarInformacionPerfil = () => {
      if(user != null){
        user.nombre = nombre
        user.direccion = direccion
        user.telefono = telefono
        if(user.nombre == null || user.telefono == null || user.direccion == null){
          firebase.database()
            .ref("usuarios/"+user.uid)
            .set({
              uid: user.uid,
              email: user.email,
              nombre: nombre,
              direccion: direccion,
              telefono: telefono
            })
            .then(() => setMensaje('Datos del perfil fueron guardados.'))
            .catch((error) => setMensaje(error.message))
        }else{
          firebase.database()
            .ref("usuarios/"+user.uid)
            .update({
              uid: user.uid,
              email: user.email,
              nombre: nombre,
              direccion: direccion,
              telefono: telefono
            })
            .then(() => setMensaje('Datos del perfil fueron guardados.'))
            .catch((error) => setMensaje(error.message))
        }
      }
    }

    const setNombreFromTextInput = (text) => {
      setNombre(text)
    }

    const setDireccionFromTextInput = (text) => {
      setDireccion(text)
    }
    
    const setTelefonoFromTextInput = (text) => {
      setTelefono(text)
    }

  return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <Text style={styles.itemTitleStyle}>Sesión del usuario</Text>                

                <View style={{marginTop:2,marginBottom:5}}>
                    <Text style={styles.itemTextStyle}>{user == null ? 'No ha iniciado sesión' : 'Bienvenido ' + user.email}</Text>                                
                </View>
                
                {user == null
                ?
                    <View>
                      <View style={{marginTop:2,marginBottom:10}}>
                          <ButtonCustom text='Iniciar sesión' onPress={() => navigation.navigate('Login')} />                              
                      </View>
                      <View style={{marginTop:10}}>
                        <Text style={styles.itemTitleStyle}>Registrarse</Text>                
                        <View style={{marginTop:5,marginBottom:5}}>
                            <Text style={styles.itemTextStyle}>Puede registrarse como nuevo usuario completando un pequeño formulario.</Text>                                
                        </View>
                        <View style={{marginTop:5,marginBottom:5}}>
                            <ButtonCustom text='Registrarse como usuario' onPress={() => navigation.navigate('Registrarse')} />                              
                        </View>
                      </View>
                    </View>
                :
                    <View>
                        <View style={{marginTop:2,marginBottom:10}}>
                          <ButtonCustom text='Cerrar sesión' onPress={() => cerrarSesionUsuario()} />                              
                        </View>

                        <View style={{marginTop:10}}>
                          <Text style={styles.itemTitleStyle}>Recuperación</Text>                
                          <View style={{marginTop:5,marginBottom:5}}>
                              <Text style={styles.itemTextStyle}>Puede solicitar se le envíe un correo electrónico con un link para cambiar su password.</Text>                                
                          </View>
                          <View style={{marginTop:5,marginBottom:10}}>
                              <ButtonCustom text='Solicitar password' onPress={() => enviarCorreoResetPassword()} />                              
                          </View>
                        </View>

                        <View style={{marginTop:10}}>
                          <Text style={styles.itemTitleStyle}>Información del usuario</Text>                
                          <View style={{marginTop:5,marginBottom:5}}>
                              <Text style={styles.itemTextStyle}>Personalice su perfil completando la información que se le pide a continuación</Text>                                
                          </View>

                          <Text style={styles.itemLabelTextStyle}>Nombre completo</Text>                                     
                          <TextInput style={styles.inputContainerStyle} onChangeText={(text) => setNombreFromTextInput(text)} value={nombre} />                           
                          <Text style={styles.itemLabelTextStyle}>Dirección de delivery</Text>                                     
                          <TextInput style={styles.inputContainerStyle} onChangeText={(text) => setDireccionFromTextInput(text)} value={direccion} />                                                   
                          <Text style={styles.itemLabelTextStyle}>Número telefónico</Text>                                     
                          <TextInput style={styles.inputContainerStyle} onChangeText={(text) => setTelefonoFromTextInput(text)} value={telefono} />                           
                        </View>     

                      {mensaje == ''
                      ?
                        <View style={{marginTop:5,marginBottom:5}}>
                          <ButtonCustom text='Guardar información' onPress={() => guardarInformacionPerfil()} />                              
                        </View>                   
                      :
                        <View>                      
                          <View style={{marginTop:5,marginBottom:5}}>
                            <ButtonCustom text='Guardar información' onPress={() => guardarInformacionPerfil()} />                              
                          </View>
                          <View style={{marginTop:10,marginBottom:10}}>
                            <Text style={styles.errorStyle} >{mensaje}</Text>
                          </View>
                        </View>            
                      }
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

export default connect(mapStateToProps,mapDispatchToProps)(perfil)

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
  paddingVertical:8
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
