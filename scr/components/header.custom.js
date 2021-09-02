import React, { Component } from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements'
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPressButtonShopping(){
    console.log('Shopping')
  }

  onPressButtonAccount(){
      console.log('Account')
  }

  render() {
    const { value, onChange} = this.props;
    return (
        <View style={styles.container}>
            <View style={styles.viewContainerLogo}>
		        <Image style={styles.imageLogo} source={require('../../assets/cm_logo.png')} resizeMode='stretch' />
                <View style={styles.viewContainerIcons}>
                    <TouchableOpacity onPress={this.onPressButtonShopping}>
                        <Icon name='shopping-cart' containerStyle={styles.iconStyle} size={36} color='#7e8186' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressButtonAccount}>
                        <Icon name='account-box' containerStyle={styles.iconStyle} size={36} color='#7e8186' />
                    </TouchableOpacity>
                </View>                
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
imageLogo:{
    width:80,
    height:55,
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
    padding:10,
    marginLeft:10,
  }
});