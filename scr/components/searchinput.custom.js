import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { value, onChange} = this.props;
    return (
        <View style={styles.borderContainer}>
            <View style={styles.viewContainerInputText}>
		        <TextInput onChangeText={onChange} value={value} style={styles.textInput} placeholder='Buscar por categoria' />
            </View>
        </View>
    );
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
textInput:{
    fontSize:18,
    fontFamily: 'Ubuntu-Light',
    height:34,
    backgroundColor:'#ededed',
    alignItems:'center',
    justifyContent:'center',    
    textAlign:'center',
    color:'#535050'
},
borderContainer: {
    flexDirection: 'row',
    padding: 4,
    marginTop: 40,
    marginBottom: 2,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#ededed',
    backgroundColor: '#ededed',
    borderWidth: 1,
    borderRadius: 10,
  },
  viewContainerInputText:{
    width:'100%',
  },  
});