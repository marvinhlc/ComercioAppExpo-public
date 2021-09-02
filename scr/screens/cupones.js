import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { connect } from 'react-redux'
import ListFlatItem from '../components/listflatitem.custom'
import SearchInput from '../components/searchinput.custom'
import {addToShoppingcart,clearToShoppingcart} from '../reducers/shoppingcart'
import {guardarCatalogo,quitarCatalogo,filtrarPorCategoria} from '../reducers/catalogo'
import firebase from '../firebase'

const Cupones = ({navigation,catalogo,guardarCatalogo,quitarCatalogo,filtrarPorCategoria}) => {

  const [dataFiltrada,setDataFiltrada] = useState([])
  const [categoriaFiltro,setCategoriaFiltro] = useState(null)

  useEffect(() => {
    let _title = navigation.getParam('title')
    filtrarPorCategoria(_title)
  },[catalogo])

  return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.containerStyle}
          data={catalogo.filtrado}
          keyExtractor={x => String(x.id)}
          renderItem={
            ({item}) => <ListFlatItem item={item} onPress={() => navigation.navigate('Comprar',{item:item}) } />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitleStyle}>No hay datos</Text>
            </View>
          }
        />
      </View>
  );
}

const mapStateToProps = state => {
  console.log(state.catalogo)
  return state
}

const mapDispatchToProps = (dispatch) => ({
  addToShoppingcart: (item) => dispatch(addToShoppingcart(item)),
  clearToShoppingcart: () => dispatch(clearToShoppingcart()),
  guardarCatalogo: (catalogo) => dispatch(guardarCatalogo(catalogo)),
  quitarCatalogo: () => dispatch(quitarCatalogo()),
  filtrarPorCategoria: (filtro) => dispatch(filtrarPorCategoria(filtro))
})

export default connect(mapStateToProps,mapDispatchToProps)(Cupones)

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    //backgroundColor: '#e6e4e7',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flatlist: {
    padding: 1,
    width: Dimensions.get('window').width,
    //backgroundColor: '#e6e4e7'
  },
  containerStyle:{
    paddingVertical: 8
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //backgroundColor:'#fff'
  },  
emptyTitleStyle:{
  fontSize:18,
	color: '#000000',
	textAlign: 'center',
  fontFamily: 'Ubuntu-Regular',
  marginBottom:5,
},  
});
