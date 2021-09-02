import React, {Component} from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Divider, Image } from 'react-native-elements';
import { format } from 'react-string-format';
import TimeAgo from 'react-native-timeago';
import PropTypes from 'prop-types';

export default class ListFlatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { item, onPress} = this.props;

    //PARA PODER USAR TIMEAGO
    let moment = require('moment');
    require('moment/locale/es-us');
    moment.locale('es-us');

    return (
		<TouchableOpacity 
      style={styles.itemStyle}
			onPress={() => onPress()}>
        <View style={styles.container}>  
          <View style={{marginBottom:10}}>
            <Image source={{uri:item.uri}} style={styles.card_image} />    
          </View>

			    <Text style={styles.itemTitleStyle}>{item.nombre}</Text>
          <Text style={styles.itemTextStyle}>{item.descripcion}</Text>
          <Divider style={styles.divider} />
          <View style={{flexDirection:'row',  alignItems: 'center',}}>
            <View>
              <Text style={styles.itemVencimientoStyle}>Vencimiento</Text>
              <TimeAgo style={styles.itemTimeagoStyle} time={item.fecha_vencimiento} interval={20000} />          
            </View>
            <View style={{alignContent:'flex-end',flex:1,flexDirection:'row-reverse',}}>
              <Text style={styles.itemPrecioStyle}>precio {format('${0}',item.precio)}</Text>
            </View>
          </View>
        </View>
		</TouchableOpacity>
    );
  }
}

ListFlatItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

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
itemStyle:{
    marginTop:2,
    marginBottom:2,
},
itemTitleStyle:{
  fontSize:22,
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
  fontSize:20,
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
	color: '#8f8a8a',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
},
card:{
  backgroundColor: '#ffffff',
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
});