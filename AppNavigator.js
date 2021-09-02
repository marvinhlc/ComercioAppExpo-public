import React from 'react'
import {TouchableOpacity, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Icon, Tooltip, Badge } from 'react-native-elements'
import InicioScreen from './scr'
import CuponesScreen from './scr/screens/cupones'
import ComprarScreen from './scr/screens/comprar'
import ShopcartScreen from './scr/screens/shopcart'
import PagarScreen from './scr/screens/pagar'
import LoginScreen from './scr/screens/login'
import PerfilScreen from './scr/screens/perfil'
import RegistrarseScreen from './scr/screens/registrarse'
import FidelidadScreen from './scr/screens/fidelidad'
import ChatScreen from './scr/screens/chat'

const BrandingLogo = () => {
    return(
        <Image style={styles.imageLogo} 
            source={require('./assets/cm_logo.png')} 
            resizeMode='stretch' />
    )
}

const Botones = ({navigation}) => {
    return (
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Shopcart')}>
                <Icon name='shopping-cart' 
                    containerStyle={styles.iconStyle} 
                    size={36} color='#7e8186' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>            
                <Icon name='account-box' 
                    containerStyle={styles.iconStyle} 
                    size={36} color='#7e8186' />
            </TouchableOpacity>
        </View>
    )
}

const AppNavigator = createStackNavigator({
    Inicio:{screen: InicioScreen},
    Cupones:{screen: CuponesScreen},
    Comprar:{screen: ComprarScreen},
    Shopcart: {screen: ShopcartScreen},
    Pagar: {screen: PagarScreen},
    Login: {screen: LoginScreen},
    Perfil: {screen: PerfilScreen},
    Registrarse: {screen: RegistrarseScreen},
    Fidelidad: {screen: FidelidadScreen},
    Chat: {screen: ChatScreen}
},
{
    initialRouteName:'Inicio',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#ffffff'
        },
        headerTitleStyle:{
            fontFamily:'Ubuntu-Regular',
            //fontSize: 16
        }
    }
})

InicioScreen.navigationOptions = ({navigation}) => {
    //title: 'Inicio',
    //headerTitle: () => <BrandingLogo />,
    return {
        title: 'Inicio',
        headerTitle: () => <BrandingLogo/>,
        headerRight: () =>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Shopcart')}>
                    <Icon name='shopping-cart' 
                        containerStyle={styles.iconStyle} 
                        size={36} color='#7e8186' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>            
                    <Icon name='account-box' 
                        containerStyle={styles.iconStyle} 
                        size={36} color='#7e8186' />
                </TouchableOpacity>
            </View>            
    }
}

CuponesScreen.navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam('title','Cargando...'),
        headerRight: () =>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Shopcart')}>
                    <Icon name='shopping-cart' 
                        containerStyle={styles.iconStyle} 
                        size={36} color='#7e8186' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>            
                    <Icon name='account-box' 
                        containerStyle={styles.iconStyle} 
                        size={36} color='#7e8186' />
                </TouchableOpacity>
            </View>            
    }
}

ComprarScreen.navigationOptions = ({navigation}) => {
    return {
        title: 'Ordenar',
        headerRight: () => <Botones navigation={navigation} />    
    }
}

ShopcartScreen.navigationOptions = {
    title: 'Su Orden',
}

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
imageLogo:{
    width:75,
    height:50,
    marginLeft:10,
},
container: {
    flexDirection: 'row',
    padding: 4,
    marginTop: 30,
    marginBottom: 2,
    backgroundColor: '#ffffff',
    width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'center',
  },
  viewContainerLogo:{
    flexDirection:'row',
  },  
  viewContainerIcons:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight:20,
    backgroundColor:'#ffffff',
    width:200,
  },
  iconStyle:{
    padding:5,
    marginLeft:2,
    //backgroundColor:'#f4d7d7'
  }
});