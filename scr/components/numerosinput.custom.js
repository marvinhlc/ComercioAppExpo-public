import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Button } from 'react-native'
import PropTypes from 'prop-types';

export default class NumerosInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { value, onChange} = this.props;
    return (
        <View style={styles.borderContainer}>
            <TouchableOpacity onPress={() => console.log("-")} style={styles.touchableStyle} > 
                <Text style={styles.textButtonStyle} >-</Text>
            </TouchableOpacity>
            <View style={{flex:1,borderColor: '#b8b8b8',borderWidth: 1,borderRadius: 0,}}>
		        <TextInput onChangeText={onChange} value={value} style={styles.textInput} />
            </View>
            <TouchableOpacity onPress={() => console.log("+")} style={styles.touchableStyle} > 
                <Text style={styles.textButtonStyle}>+</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

NumerosInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
textInput:{
    fontSize:28,
    fontFamily: 'Ubuntu-Light',
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center',    
    textAlign:'center',
    color:'#535050'
},
borderContainer: {
    flexDirection: 'row',
    padding: 0,
    marginTop: 40,
    marginBottom: 4,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#b8b8b8',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    alignItems:'center'
  },
  viewContainerInputText:{
    flex:2,
    backgroundColor:'#f7c0c0',
    marginLeft:5,
    marginRight:5,
  },  
  textButtonStyle:{
    padding:0,
    fontSize: 30,
    fontFamily: 'Ubuntu-Regular',
    color:'#6a6868',
    textAlign:'center'
  },
touchableStyle:{
    flex:1,
	backgroundColor: '#ffffff',
	borderRadius:10,
}
});