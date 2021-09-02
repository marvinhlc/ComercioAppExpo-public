import { StatusBar } from 'expo-status-bar'
import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import ListFlatItem from './components/listflatitem.custom'
import SearchInput from './components/searchinput.custom'
import ButtonCustom from './components/button.custom'
import Header from './components/header.custom'
import { SliderBox } from "react-native-image-slider-box";
import firebase from './firebase'
import {guardarCategorias,quitarCategorias} from './reducers/categorias'
import {guardarCatalogo,quitarCatalogo,filtrarPorCategoria} from './reducers/catalogo'
import {registrarSistema,quitarSistema} from './reducers/sistema'
import {dispatchDefaultMessage} from './components/mensaje.custom'

const App = ({navigation,user,sistema,categorias,catalogo,galeria,guardarCategorias,quitarCategorias,guardarCatalogo,filtrarPorCategoria,registrarSistema}) => {

  /*categorias.map((item) => {
    firebase.database().ref('categorias')
    .push(item)
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  })*/

  /*firebase.database().ref('sistema')
  .push({
    emailStore:'yovipapp@gmail.com',
    uidStore: 'qwCM6m8tjKMHIIncOtGavzS4UFS2',
    nombreStore:'OPTICA INTERVISION',
    ceoStore:'Ronis Nilson Morán',
    aliasCeoStore:'Ronis',
    estadoStore:'ABIERTO',
  })*/

  const [okCatalogo,setOkCatalogo] = useState(false)
  const [filtro,setFiltro] = useState(null)

  let [fontsLoaded] = useFonts({
    'Ubuntu-Regular': require('../assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Light': require('../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Medium': require('../assets/fonts/Ubuntu-Medium.ttf'),    
  });  

  useEffect(() => {
    if(sistema == null){
      firebase.database().ref('sistema/')
      .on('value',(snapshot) => {
        var config = {}
        snapshot.forEach((data) => {
          config = data.val()
        })
        registrarSistema(config)
      });
    }
    if(categorias == null){
      firebase.database().ref('categorias/')
      .on('value', (snapshot) => {
        var data = []
        snapshot.forEach(element => {
          data.push({
            categoria: element.val().categoria,
            id: element.val().id,
            uri: element.val().uri
          })
        });
        guardarCategorias(data)
      })
    }     
    if(catalogo.valido == false){
      firebase.database().ref('catalogo/')
      .on('value',(snapshot) => {
        var data = []
        snapshot.forEach(element => {
          data.push({
            fbkey: element.key,
            id: element.val().id,
            nombre: element.val().nombre,
            cupon: element.val().cupon,
            descripcion: element.val().descripcion,
            precio: element.val().precio,
            uri: element.val().uri,
            fecha_vencimiento: element.val().fecha_vencimiento,
            existencia: element.val().existencia,
            vendidos: element.val().vendidos,
            disponible: element.val().disponible,
            categoria: element.val().categoria,
          })
        }); 
        guardarCatalogo(data)
        setOkCatalogo(true)  
      })
    }
  });

  if(!fontsLoaded && okCatalogo == false){
    return <AppLoading/>
  }else{
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor='#ffffff' />
        <View style={{height:200}}>
          <SliderBox 
            images={galeria} 
            sliderBoxHeight={200}
            dotColor="#a8a4a4"
            autoplay={true}
            circleLoop={true}
            resizeMode='stretch'
            inactiveDotColor="#4a4545"/>     
        </View>
        <FlatList
            style={styles.flatlist}
            contentContainerStyle={styles.containerStyle}
            data={categorias}
            keyExtractor={x => String(x.id)}
            renderItem={
              ({item}) => 
              <TouchableOpacity onPress={() => {
                setFiltro(item.categoria)
                filtrarPorCategoria(item.categoria)
                navigation.navigate('Cupones',{title:item.categoria})
              } }>
                <View style={styles.itemContainer}>
                  <Text style={styles.itemCategoria}>{item.categoria}</Text>
                  <View style={styles.iconItem}>
                    <Icon name='keyboard-arrow-right' color='#afacac' />
                  </View>
                </View>
              </TouchableOpacity>
            }
            ListFooterComponent={
              ({item}) => 
                <View style={styles.footerFlatList}>
                    <Text style={styles.itemTitleStyle}>Cliente frecuente</Text>                
                    <Text style={styles.itemLabelTextStyle}>Cada vez que escanea su codigo QR acumula puntos para ganar premios.</Text>                                                  
                    <View style={{marginTop:5,marginBottom:1}}>
                      <ButtonCustom text="Mostrar codigo QR" onPress={() => {
                          if(user == null){
                            /*showMessage({
                                message: "Debe iniciar sesión",
                                description: "No se conoce el usuario para lanzar esta función.",
                                type: "default",
                                position: "bottom",
                                textStyle:styles.flashTextoStyle,
                                titleStyle:styles.flashTitleStyle
                            });*/
                            dispatchDefaultMessage('Debe iniciar sesión','No se conoce el usuario para lanzar esta función')
                            return
                          }
                          navigation.navigate('Fidelidad')
                      }} />
                    </View>
                </View>
            }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.catalogo)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  guardarCategorias: (categorias) => dispatch(guardarCategorias(categorias)),
  quitarCategorias: (categorias) => dispatch(quitarCategorias(categorias)),
  filtrarPorCategoria: (filtro) => dispatch(filtrarPorCategoria(filtro)),
  guardarCatalogo: (catalogo) => dispatch(guardarCatalogo(catalogo)),  
  registrarSistema: (sistema) => dispatch(registrarSistema(sistema)),
  quitarSistema: () => dispatch(quitarSistema()),
})

export default connect(mapStateToProps,mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatlist: {
    width: Dimensions.get('window').width,
    //backgroundColor: '#bfbfc0',
  },
  containerStyle:{
    paddingVertical: 8
  },
  itemCategoria:{
    fontSize:20,
	  color: '#000000',
	  textAlign: 'left',
    fontFamily: 'Ubuntu-Light',
    width: '95%',
  },
  itemContainer:{
    height:65,
    padding:20,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',   
    flexDirection:'row',    
    borderRadius:5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
  },
  iconItem:{
    alignItems:'center',
    justifyContent:'flex-end',
  },
  footerFlatList:{
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
flashTitleStyle:{
  fontSize:18,
	color: '#ffffff',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
},
flashTextoStyle:{
  fontSize:16,
  color: '#ffffff',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
},  
});
